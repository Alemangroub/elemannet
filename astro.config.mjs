import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: 'server', 
  // Force redeploy: 1
  adapter: vercel({
    checkOrigin: true // Re-enabled for security
  }), 
  integrations: [tailwind(), react()]
});