import {defineField, defineType, defineArrayMember} from 'sanity'
import {StackIcon} from '@sanity/icons'

export default defineType({
  name: 'dienstleistungenCards',
  title: 'Dienstleistungen Cards',
  type: 'object',
  icon: StackIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Small text above title',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'card',
          title: 'Text Card',
          fields: [
            defineField({
              name: 'number',
              title: 'Number',
              type: 'string',
              description: 'Display number (e.g. "01")',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'number',
            },
            prepare({title, subtitle}) {
              return {
                title: title,
                subtitle: `Card ${subtitle}`,
              }
            },
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'imageTile',
          title: 'Image Tile',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  description: '⚠️ Alt text is recommended for accessibility. Describe what the image shows.',
                }),
              ],
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              media: 'image',
              alt: 'image.alt',
            },
            prepare({media, alt}) {
              return {
                title: alt || 'Image Tile',
                subtitle: 'Image',
                media,
              }
            },
          },
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label',
    },
  },
})
