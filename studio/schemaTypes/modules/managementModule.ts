import {defineField, defineType, defineArrayMember} from 'sanity'
import {UsersIcon} from '@sanity/icons'

export default defineType({
  name: 'managementModule',
  title: 'Management Module',
  type: 'object',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'people',
      title: 'People',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'personItem',
          title: 'Person',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
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
                  description: 'Describe the image for accessibility',
                  validation: (rule) =>
                    rule.warning('Alt text is recommended for accessibility and SEO'),
                }),
              ],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'bio',
              title: 'Bio',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'phone',
              title: 'Phone Number',
              type: 'string',
            }),
            defineField({
              name: 'email',
              title: 'Email Address',
              type: 'string',
              validation: (rule) => rule.email(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image',
            },
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled',
        subtitle: 'Management Module',
      }
    },
  },
})
