import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuer',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'string',
      description: 'e.g. Nov 2024',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI / ML', value: 'AI / ML' },
          { title: 'Cloud', value: 'Cloud' },
          { title: 'MLOps', value: 'MLOps' },
          { title: 'Web Dev', value: 'Web Dev' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'previewBg',
      title: 'Preview Gradient (CSS)',
      type: 'string',
    }),
    defineField({
      name: 'verifyUrl',
      title: 'Verify Credential URL',
      type: 'url',
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
