// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// Determine the base path based on the environment
const base = process.env.NODE_ENV === 'production' ? '/elemannet' : '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://Alemangroub.github.io',
  base: base,
  vite: {
    plugins: [tailwindcss()]
  }
});