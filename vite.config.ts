import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative asset paths so the site works on any deployment path
  base: './',
  build: {
    outDir: 'dist',
  },
});
