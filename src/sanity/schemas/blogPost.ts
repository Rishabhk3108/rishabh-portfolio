import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Development', value: 'Development' },
          { title: 'SEO', value: 'SEO' },
          { title: 'Journey', value: 'Journey' },
          { title: 'Startup', value: 'Startup' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. 7 min read',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'e.g. Apr 2025',
    }),
    defineField({
      name: 'previewBg',
      title: 'Preview Gradient (CSS)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
