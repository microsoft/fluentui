import type { UserConfig } from 'vite';

export default {
  clearScreen: false,
  publicDir: '../../public',
  esbuild: {
    target: 'ES2019',
  },
  server: {
    port: 5173,
    strictPort: true,
    debug: true,
  },
  build: {
    outDir: './dist',
    minify: false,
  },
  preview: {
    port: 5173,
    strictPort: true,
    open: false,
  },
} as UserConfig;
