import {defineField, defineType, defineArrayMember} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export const navigation = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Navigation Title',
      type: 'string',
      description: 'Internal name for this navigation (e.g., "Main Menu", "Footer Menu")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Text displayed in the menu',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'linkType',
              title: 'Link Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Internal Page', value: 'internal'},
                  {title: 'External URL', value: 'external'},
                ],
                layout: 'radio',
              },
              initialValue: 'internal',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'internalLink',
              title: 'Internal Link',
              type: 'reference',
              to: [{type: 'page'}, {type: 'homepage'}],
              hidden: ({parent}) => parent?.linkType !== 'internal',
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as {linkType?: string}
                  if (parent?.linkType === 'internal' && !value) {
                    return 'Internal link is required'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'externalUrl',
              title: 'External URL',
              type: 'url',
              hidden: ({parent}) => parent?.linkType !== 'external',
              validation: (rule) =>
                rule.custom((value, context) => {
                  const parent = context.parent as {linkType?: string}
                  if (parent?.linkType === 'external' && !value) {
                    return 'External URL is required'
                  }
                  return true
                }),
            }),
            defineField({
              name: 'children',
              title: 'Submenu Items',
              type: 'array',
              description: 'Optional dropdown menu items',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'subNavItem',
                  title: 'Submenu Item',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'linkType',
                      title: 'Link Type',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Internal Page', value: 'internal'},
                          {title: 'External URL', value: 'external'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'internal',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'internalLink',
                      title: 'Internal Link',
                      type: 'reference',
                      to: [{type: 'page'}, {type: 'homepage'}],
                      hidden: ({parent}) => parent?.linkType !== 'internal',
                      validation: (rule) =>
                        rule.custom((value, context) => {
                          const parent = context.parent as {linkType?: string}
                          if (parent?.linkType === 'internal' && !value) {
                            return 'Internal link is required'
                          }
                          return true
                        }),
                    }),
                    defineField({
                      name: 'externalUrl',
                      title: 'External URL',
                      type: 'url',
                      hidden: ({parent}) => parent?.linkType !== 'external',
                      validation: (rule) =>
                        rule.custom((value, context) => {
                          const parent = context.parent as {linkType?: string}
                          if (parent?.linkType === 'external' && !value) {
                            return 'External URL is required'
                          }
                          return true
                        }),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'label',
                      linkType: 'linkType',
                    },
                    prepare({title, linkType}) {
                      return {
                        title: title || 'Untitled',
                        subtitle: linkType === 'internal' ? 'Internal link' : 'External URL',
                      }
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              title: 'label',
              linkType: 'linkType',
              hasChildren: 'children',
            },
            prepare({title, linkType, hasChildren}) {
              const subtitle = hasChildren?.length
                ? `${linkType === 'internal' ? 'Internal' : 'External'} (${hasChildren.length} submenu items)`
                : linkType === 'internal'
                  ? 'Internal link'
                  : 'External URL'
              return {
                title: title || 'Untitled',
                subtitle,
              }
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
      items: 'items',
    },
    prepare({title, items}) {
      return {
        title: title || 'Untitled Navigation',
        subtitle: items ? `${items.length} menu items` : 'No items',
      }
    },
  },
})
