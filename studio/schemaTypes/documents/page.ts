import {defineField, defineType, defineArrayMember} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (rule) =>
        rule.max(60).warning('Recommended to keep under 60 characters for best display in search results'),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      validation: (rule) =>
        rule.max(160).warning('Recommended to keep under 160 characters for best display in search results'),
    }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        defineArrayMember({type: 'sectionHeader'}),
        defineArrayMember({type: 'contentModule'}),
        defineArrayMember({type: 'imageText'}),
        defineArrayMember({type: 'referenzenOverview'}),
        defineArrayMember({type: 'dienstleistungenCards'}),
        defineArrayMember({type: 'contactModule'}),
        defineArrayMember({type: 'contactForm'}),
        defineArrayMember({type: 'managementModule'}),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
})
