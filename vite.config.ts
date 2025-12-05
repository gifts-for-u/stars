import { defineConfig } from 'vite';

export default defineConfig({
  base: '/stars/', // Change 'stars' to match your GitHub repository name
  build: {
    outDir: 'dist',
  },
});
