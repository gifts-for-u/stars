import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  // Allow overriding the base path per environment while defaulting to
  // relative URLs so static hosts and subdirectory deployments work.
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE_PATH ?? './';

  return {
    base,
    build: {
      outDir: 'dist',
    },
  };
});
