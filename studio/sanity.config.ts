import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

const sharedConfig = {
  projectId: '5mzwjja7',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
}

function getPreviewUrl(baseUrl: string) {
  return {
    productionUrl: async (prev: string | undefined, context: {document: Record<string, any>}) => {
      const {document} = context

      if (document._type === 'homepage') {
        return `${baseUrl}/`
      }
      if (document._type === 'page' && document.slug?.current) {
        return `${baseUrl}/${document.slug.current}`
      }
      if (document._type === 'referenz' && document.slug?.current) {
        return `${baseUrl}/referenzen/${document.slug.current}`
      }
      return prev
    },
  }
}

export default defineConfig([
  {
    ...sharedConfig,
    name: 'production',
    title: 'Production',
    dataset: 'production',
    basePath: '/prod',
    document: getPreviewUrl('https://bs-elektro-ag.ch'),
  },
  {
    ...sharedConfig,
    name: 'staging',
    title: 'Staging',
    dataset: 'staging',
    basePath: '/stage',
    document: getPreviewUrl('https://staging-bs-elektro.netlify.app'),
  },
])
