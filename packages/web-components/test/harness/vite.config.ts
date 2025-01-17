import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import type { UserConfig } from 'vite';

const { resolve } = createRequire(import.meta.url);

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
  resolve: {
    alias: {
      '@fluentui/tokens': join(dirname(resolve('@fluentui/tokens/package.json')), 'src'),
    },
  },
} as UserConfig;
