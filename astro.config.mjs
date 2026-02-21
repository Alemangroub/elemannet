import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: 'server', 
  adapter: vercel({
    // Disable Astro's built-in CSRF protection
    // This is safe to do on Vercel as they provide their own protection
    checkOrigin: false
  }), 
  integrations: [tailwind(), react()]
});