import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export default defineType({
  name: 'sectionHeader',
  title: 'Section Header',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Small green text above the title (e.g. "Über uns")',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      description: 'Introductory paragraph',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'label',
    },
  },
})
