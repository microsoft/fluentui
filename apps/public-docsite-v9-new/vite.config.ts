import { fileURLToPath } from 'node:url';

import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import mdx from 'fumadocs-mdx/vite';
import { defineConfig, type UserConfig } from 'vite';

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
export default defineConfig(
  async (): Promise<UserConfig> => ({
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
      rollupOptions: {
        onwarn(warning, defaultHandler) {
          /*
           * Fluent source files carry `'use client'` for React Server Components. This build has
           * no RSC boundary, so the directive is correctly ignored — but Rollup wants to warn once
           * per module, and with sourcemaps disabled it cannot resolve the location, so the warning
           * degrades into SOURCEMAP_ERROR. That produced 608 lines of noise which masked a genuine
           * Rollup resolve failure during the headless migration.
           *
           * Both codes are suppressed together because one is only ever the undelivered form of the
           * other here. Every other warning code still surfaces.
           */
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || warning.code === 'SOURCEMAP_ERROR') {
            return;
          }

          defaultHandler(warning);
        },
      },
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
        {
          // Library subpath exports (e.g. '@fluentui/react-headless-components-preview/avatar-group').
          // Must be declared after the -stories alias so it cannot shadow it.
          find: /^@fluentui\/react-headless-components-preview\/(.*)$/,
          replacement: `${repoRoot}packages/react-components/react-headless-components-preview/library/src/$1.ts`,
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
  }),
);
