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
import { tsconfigAliases } from './vite-plugins/tsconfig-aliases.js';

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
      /*
       * Resolve @fluentui/* to source, exactly as Storybook does via TsconfigPathsPlugin.
       *
       * Without this the site resolves those packages through node, which requires every
       * component package to have been built first — so a clean checkout fails, and a stale
       * `lib/` can silently win over the source being edited. It also removes the need to
       * hand-maintain one alias per `*-stories` package as more trees are migrated.
       */
      alias: tsconfigAliases(`${repoRoot}tsconfig.base.json`, repoRoot),
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
