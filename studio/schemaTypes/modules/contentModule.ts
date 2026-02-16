import {defineField, defineType, defineArrayMember} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export default defineType({
  name: 'contentModule',
  title: 'Content Module',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H3', value: 'h3'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (rule) =>
                      rule.uri({allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel']}),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          title: 'Image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        }),
        defineArrayMember({
          name: 'pdfDocument',
          type: 'object',
          title: 'PDF Document',
          fields: [
            {
              name: 'file',
              type: 'file',
              title: 'PDF File',
              options: {accept: 'application/pdf'},
              validation: (rule) => rule.required(),
            },
            {
              name: 'title',
              type: 'string',
              title: 'Link Text',
              description: 'Text displayed as the download link',
              validation: (rule) => rule.required(),
            },
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
  },
})
