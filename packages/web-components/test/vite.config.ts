import defaultConfig from '@microsoft/fast-test-harness/vite.config.mjs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { mergeConfig } from 'vite';

const require = createRequire(import.meta.url);
const fastElementPackageRoot = dirname(require.resolve('@microsoft/fast-element/package.json'));

export default mergeConfig(defaultConfig, {
  publicDir: '../public',
  resolve: {
    alias: {
      '@microsoft/fast-element/declarative.js': resolve(fastElementPackageRoot, 'dist', 'esm', 'declarative', 'index.js'),
      '@microsoft/fast-element/hydration.js': resolve(fastElementPackageRoot, 'dist', 'esm', 'hydration.js'),
    },
  },
});
