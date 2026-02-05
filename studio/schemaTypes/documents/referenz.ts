import {defineField, defineType} from 'sanity'
import {CaseIcon} from '@sanity/icons'

export default defineType({
  name: 'referenz',
  title: 'Referenz',
  type: 'document',
  icon: CaseIcon,
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
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
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Objektbeschreibung',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'completionYear',
      title: 'Fertigstellung',
      type: 'string',
    }),
    defineField({
      name: 'buildType',
      title: 'Bauart',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buildingType',
      title: 'Gebäudeart',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Leistungsbeschreibung',
      type: 'array',
      of: [{type: 'string'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Bauherrschaft',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'completionYear',
      media: 'image',
    },
  },
})
