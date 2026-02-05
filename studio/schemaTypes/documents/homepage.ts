import {defineField, defineType, defineArrayMember} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
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
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          title: 'Background Image',
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
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string',
        }),
        defineField({
          name: 'contactText',
          title: 'Contact Text',
          type: 'array',
          description: 'Flexible contact information with links (e.g., phone, email, or custom text)',
          of: [
            {
              type: 'block',
              styles: [{title: 'Normal', value: 'normal'}],
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
                          rule.uri({
                            allowRelative: true,
                            scheme: ['http', 'https', 'mailto', 'tel'],
                          }),
                      },
                    ],
                  },
                ],
              },
            },
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'usp',
      title: 'USP Text',
      type: 'text',
      description: 'Large text paragraph that appears below the hero section',
      rows: 4,
    }),
    defineField({
      name: 'dienstleistungen',
      title: 'Dienstleistungen',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          description: 'Small text above title (e.g. "Dienstleistungen")',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          description: 'Section heading (e.g. "Was wir tun")',
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
                  name: 'link',
                  title: 'Link',
                  type: 'string',
                  description: 'URL the card links to (e.g. "/ueber-uns" or "#services")',
                }),
              ],
              preview: {
                select: {title: 'title', subtitle: 'number'},
                prepare({title, subtitle}) {
                  return {title, subtitle: `Card ${subtitle}`}
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
                  options: {hotspot: true},
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                      description:
                        '⚠️ Alt text is recommended for accessibility. Describe what the image shows.',
                    }),
                  ],
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {media: 'image', alt: 'image.alt'},
                prepare({media, alt}) {
                  return {title: alt || 'Image Tile', subtitle: 'Image', media}
                },
              },
            }),
          ],
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Section',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'contactPeople',
          title: 'Contact People',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'contactPerson',
              title: 'Contact Person',
              fields: [
                defineField({
                  name: 'name',
                  title: 'Name',
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
                  name: 'phone',
                  title: 'Phone Number',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'email',
                  title: 'Email Address',
                  type: 'string',
                  validation: (rule) => rule.required().email(),
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                  media: 'image',
                },
              },
            }),
          ],
          validation: (rule) => rule.max(2),
        }),
      ],
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
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage'}
    },
  },
})
