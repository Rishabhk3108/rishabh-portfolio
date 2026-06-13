import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import project from './src/sanity/schemas/project'
import certification from './src/sanity/schemas/certification'
import blogPost from './src/sanity/schemas/blogPost'

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio',
  projectId: 'r42kyqwl',
  dataset: 'production',
  plugins: [
    structureTool(),
  ],
  schema: {
    types: [project, certification, blogPost],
  },
})
