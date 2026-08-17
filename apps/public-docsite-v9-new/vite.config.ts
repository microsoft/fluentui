import { fileURLToPath } from 'node:url';

import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import mdx from 'fumadocs-mdx/vite';
import { defineConfig } from 'vite';

import * as MdxConfig from './source.config.js';
import { fullSource } from './vite-plugins/full-source.js';
import { guardUnsupportedStories } from './vite-plugins/guard-unsupported-stories.js';
import { markdownAsString } from './vite-plugins/markdown-as-string.js';
import { storyOrder } from './vite-plugins/story-order.js';

const require = (await import('node:module')).createRequire(import.meta.url);
const { getImportMappingsForExportToSandboxAddon } = require('@fluentui/scripts-storybook');

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));

/**
 * The site is published beneath /docs on a static host (design D9), so Vite emits
 * asset URLs relative to that base and React Router routes beneath the same prefix.
 */
export default defineConfig(async () => ({
  /*
   * The site lives entirely under /docs (design D9).
   *
   * React Router prerenders pages into `<outDir>/docs/**` because of its `basename`, so
   * assets are emitted alongside them under `docs/assets` rather than at the output root.
   * That keeps `dist/client` a correct site root and makes deployment a single copy —
   * previously assets were emitted to `dist/client/assets` while the HTML asked for
   * `/docs/assets`, which only worked if the deploy step merged two directories.
   */
  base: '/',
  build: {
    assetsDir: 'docs/assets',
  },
  ssr: {
    // Prerendering runs the app through Node. Fluent packages ship chunked ESM that
    // Node cannot resolve directly, so Vite must bundle them rather than externalize.
    noExternal: [/^@fluentui\//],
  },
  resolve: {
    alias: [
      // Mirrors the tsconfig.base.json wildcard path entries (design D7). Wildcards keep
      // per-page code splitting; the `stories/src/index.ts` barrels are empty by design.
      {
        find: /^@fluentui\/react-button-stories\/(.*)$/,
        replacement: `${repoRoot}packages/react-components/react-button/stories/$1`,
      },
      {
        find: /^@fluentui\/react-headless-components-preview-stories\/(.*)$/,
        replacement: `${repoRoot}packages/react-components/react-headless-components-preview/stories/$1`,
      },
    ],
  },
  plugins: [
    guardUnsupportedStories(),
    markdownAsString(),
    storyOrder(),
    fullSource({
      importMappings: getImportMappingsForExportToSandboxAddon(),
      // The headless tree styles its examples with CSS Modules rather than Griffel, so the
      // plugin must collect those stylesheets (and the shared tokens) for the sandbox export.
      cssModules: {
        tokensFilePath: `${repoRoot}packages/react-components/react-headless-components-preview/stories/.storybook/tokens.css`,
      },
    }),
    await mdx(MdxConfig),
    tailwindcss(),
    reactRouter(),
  ],
}));
