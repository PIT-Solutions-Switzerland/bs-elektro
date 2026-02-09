import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'bs-elektro',

  projectId: 'w09dask9',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    // Preview URLs - maps documents to their frontend URLs
    productionUrl: async (prev, context) => {
      const {document} = context

      // Base URL - change to your production URL when deploying
      const baseUrl = 'http://localhost:4321'

      // Homepage
      if (document._type === 'homepage') {
        return `${baseUrl}/`
      }

      // Regular pages with slugs
      if (document._type === 'page' && document.slug?.current) {
        return `${baseUrl}/${document.slug.current}`
      }

      // Referenzen pages
      if (document._type === 'referenz' && document.slug?.current) {
        return `${baseUrl}/referenzen/${document.slug.current}`
      }

      // Fall back to default if no match
      return prev
    },
  },
})
