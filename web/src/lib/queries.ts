import { client } from './sanity'

const moduleFields = `
  _type,
  _key,
  _type == "sectionHeader" => {
    label, title, intro
  },
  _type == "contentModule" => {
    heading, content
  },
  _type == "imageText" => {
    image, title, text, ctaText, ctaLink, reversed
  },
  _type == "referenzenOverview" => {
    title,
    referenzen[]-> {
      _id, title, slug, image, address, description,
      completionYear, buildType, buildingType, services, client
    }
  },
  _type == "dienstleistungenCards" => {
    label, title,
    items[] {
      _type,
      _type == "card" => {
        number, title, description
      },
      _type == "imageTile" => {
        image
      }
    }
  },
  _type == "contactModule" => {
    title, mapEmbedUrl, address, phone, email
  },
  _type == "contactForm" => {
    title, intro, subjectOptions[] { value, label }, submitLabel
  },
  _type == "managementModule" => {
    title,
    people[] {
      name, role, image, bio, phone, email
    }
  }
`

export async function getHomepage() {
  return client.fetch(`
    *[_type == "homepage"][0] {
      seoTitle, seoDescription,
      hero { image, title, subtitle, contactText },
      usp,
      dienstleistungen {
        label,
        title,
        items[] {
          _type,
          _type == "card" => {
            number, title, link
          },
          _type == "imageTile" => {
            image
          }
        }
      },
      contact {
        label,
        title,
        contactPeople[] {
          name,
          image,
          phone,
          email
        }
      },
      modules[] { ${moduleFields} }
    }
  `)
}

export async function getPage(slug: string) {
  return client.fetch(
    `
    *[_type == "page" && slug.current == $slug][0] {
      title, seoTitle, seoDescription,
      modules[] { ${moduleFields} }
    }
  `,
    { slug },
  )
}

export async function getAllPageSlugs() {
  return client.fetch(`*[_type == "page" && defined(slug.current)].slug.current`)
}

const navItemFields = `
  label,
  linkType,
  linkType == "internal" => {
    "href": select(
      internalLink->_type == "homepage" => "/",
      "/" + internalLink->slug.current
    )
  },
  linkType == "external" => {
    "href": externalUrl
  }
`

export async function getNavigation() {
  return client.fetch(`
    *[_type == "navigation"][0] {
      items[] {
        ${navItemFields},
        children[] {
          ${navItemFields}
        }
      }
    }
  `)
}

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      logo,
      favicon,
      footerContent,
      footerLinks[] { label, href },
      customHeadTags
    }
  `)
}
