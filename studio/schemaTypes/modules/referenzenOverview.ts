import {defineField, defineType} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export default defineType({
  name: 'referenzenOverview',
  title: 'Referenzen Overview',
  type: 'object',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'referenzen',
      title: 'Referenzen',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'referenz'}]}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
