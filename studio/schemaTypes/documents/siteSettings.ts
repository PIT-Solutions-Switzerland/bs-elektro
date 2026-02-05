import {defineField, defineType, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Settings Title',
      type: 'string',
      description: 'Internal name (not displayed on website)',
      initialValue: 'Site Settings',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Website Logo',
      type: 'image',
      description: 'Main logo displayed in the header',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the logo for accessibility',
          validation: (rule) =>
            rule.warning('Alt text is recommended for accessibility and SEO'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Small icon displayed in browser tabs (recommended: 32x32px or 64x64px)',
      options: {
        hotspot: false,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'footerContent',
      title: 'Footer Content',
      type: 'array',
      description: 'Rich text content for the website footer',
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
    defineField({
      name: 'footerLinks',
      title: 'Footer Links',
      type: 'array',
      description: 'Links displayed at the bottom of the footer (e.g. Datenschutz, Impressum)',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerLink',
          title: 'Footer Link',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
              description: 'Link target (e.g. "/datenschutz" or "https://example.com")',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'href'},
          },
        }),
      ],
    }),
    defineField({
      name: 'customHeadTags',
      title: 'Custom HTML Head Tags',
      type: 'text',
      description:
        '⚠️ Achtung, kritisches Setting. Bitte nur von Profis einfüllen lassen.\n\nAdd custom HTML tags (analytics, meta tags, scripts) that will be inserted in the <head> section.',
      rows: 10,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global website configuration',
      }
    },
  },
})
