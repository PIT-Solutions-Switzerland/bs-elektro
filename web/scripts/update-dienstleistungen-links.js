/**
 * Script to automatically update homepage dienstleistungen links with slugified anchors
 * Run with: node scripts/update-dienstleistungen-links.js
 */

import { createClient } from '@sanity/client'

// Slugify function matching the frontend implementation
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Initialize Sanity client
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'w09dask9',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, // You'll need a write token
})

async function updateDienstleistungenLinks() {
  try {
    console.log('🔍 Fetching homepage document...')

    // Fetch the homepage document
    const homepage = await client.fetch('*[_type == "homepage"][0]')

    if (!homepage) {
      console.error('❌ Homepage document not found!')
      return
    }

    console.log('✅ Homepage found:', homepage._id)

    // Check if dienstleistungen section exists
    if (!homepage.dienstleistungen?.items) {
      console.error('❌ No dienstleistungen items found!')
      return
    }

    console.log(`📝 Found ${homepage.dienstleistungen.items.length} items`)

    // Update each card with a slugified link
    const updatedItems = homepage.dienstleistungen.items.map((item, index) => {
      if (item._type === 'card' && item.title) {
        const slug = slugify(item.title)
        const link = `/dienstleistungen#${slug}`

        console.log(`  ${index + 1}. "${item.title}" -> ${link}`)

        return {
          ...item,
          link,
        }
      }
      return item
    })

    // Update the homepage document
    console.log('\n🚀 Updating homepage...')

    await client
      .patch(homepage._id)
      .set({
        'dienstleistungen.items': updatedItems,
      })
      .commit()

    console.log('✅ Successfully updated all dienstleistungen links!')
    console.log('\n📋 Summary:')
    updatedItems.forEach((item, index) => {
      if (item._type === 'card' && item.link) {
        console.log(`  • ${item.title}: ${item.link}`)
      }
    })

  } catch (error) {
    console.error('❌ Error updating links:', error)
    throw error
  }
}

// Run the script
updateDienstleistungenLinks()
  .then(() => {
    console.log('\n✨ Done!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error)
    process.exit(1)
  })
