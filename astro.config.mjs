import { defineConfig } from 'astro/config';

// Served from GitHub Pages at https://rnp-musings.github.io/the-story-of-art/
export default defineConfig({
  site: 'https://rnp-musings.github.io',
  base: '/the-story-of-art',
  trailingSlash: 'always',
  build: { format: 'directory' }
});
