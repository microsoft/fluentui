import { fileURLToPath } from 'node:url';

import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import mdx from 'fumadocs-mdx/vite';
import { createLogger, defineConfig } from 'vite';
import type { UserConfig } from 'vite';

import * as MdxConfig from './source.config.ts';
import { fullSource } from './vite-plugins/full-source.ts';
import { markdownAsString } from './vite-plugins/markdown-as-string.ts';
import { scopeStoryGlobals } from './vite-plugins/scope-story-globals.ts';
import { storyOrder } from './vite-plugins/story-order.ts';
import { tsconfigAliases } from './vite-plugins/tsconfig-aliases.ts';

const require = (await import('node:module')).createRequire(import.meta.url);
const { getImportMappingsForExportToSandboxAddon } = require('@fluentui/scripts-storybook');

const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
const hostingBase = process.env.DOCSITE_BASE_PATH || '/';

const logger = createLogger();
const warnOnce = logger.warnOnce.bind(logger);
logger.warnOnce = (message, options) => {
  // Tabster 8.8.0 publishes maps without sourcesContent or the referenced src files.
  if (
    /^Sourcemap for ".*\/node_modules\/tabster\/dist\/esm\/.*\.js" points to missing source files$/.test(
      message.replace(/\\/g, '/'),
    )
  ) {
    return;
  }
  warnOnce(message, options);
};

if (!/^\/(?:[a-zA-Z0-9_-]+\/)*$/.test(hostingBase)) {
  throw new Error('DOCSITE_BASE_PATH must be a pathname with leading and trailing slashes, such as /fluentui/.');
}

export default defineConfig(
  async (): Promise<UserConfig> => ({
    base: hostingBase,
    customLogger: logger,
    optimizeDeps: {
      // Fumadocs Story loads this CommonJS entry through its form controls.
      include: ['use-sync-external-store/shim/with-selector'],
    },
    build: {
      assetsDir: 'docs/assets',
      rollupOptions: {
        output: {
          // Calendar's internal barrels form a cycle. Keep that library together rather
          // than splitting its implementation and re-exports between lazy page chunks.
          manualChunks(id) {
            if (id.replace(/\\/g, '/').includes('/react-calendar-compat/library/src/')) {
              return 'calendar-compat';
            }
          },
        },
        onwarn(warning, defaultHandler) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE' || warning.code === 'SOURCEMAP_ERROR') {
            return;
          }

          defaultHandler(warning);
        },
      },
    },
    ssr: {
      noExternal: [/^@fluentui\//, 'tabster', 'keyborg'],
    },
    resolve: {
      alias: [
        {
          find: /^@repo\/(.*)$/,
          replacement: `${repoRoot}$1`,
        },
        ...tsconfigAliases(`${repoRoot}tsconfig.base.json`, repoRoot),
      ],
    },
    plugins: [
      markdownAsString(),
      scopeStoryGlobals(),
      storyOrder(),
      fullSource({
        importMappings: getImportMappingsForExportToSandboxAddon(),
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
