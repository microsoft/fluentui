import { createRequire } from 'node:module';

import * as babel from '@babel/core';
import type { Plugin } from 'vite';

const require = createRequire(import.meta.url);

const STORY_FILE = /\.stories\.(?:jsx?|tsx?)$/;

export interface FullSourceOptions {
  /**
   * Map of internal package names to their public replacement, so displayed source
   * imports from `@fluentui/react-components` rather than an internal package.
   */
  importMappings: Record<string, { replace: string }>;
  /** Enable CSS Module collection (headless tree). */
  cssModules?: boolean | { tokensFilePath?: string };
}

/**
 * Attaches `parameters.fullSource` (and `parameters.cssModuleSources`) to every story
 * export, by running the same babel plugin Storybook runs (design D2).
 *
 * Unlike the Storybook webpack rule, babel is invoked here with *only* this plugin, so
 * there is no need to strip the Griffel/v9 presets first — this is a pure AST-inject
 * pass that leaves TS/JSX intact for esbuild to transpile afterwards.
 */
export function fullSource(options: FullSourceOptions): Plugin {
  const pluginPath = require.resolve('@fluentui/babel-preset-storybook-full-source');

  return {
    name: 'fluentui:full-source',
    enforce: 'pre',

    async transform(code, id) {
      const [filename] = id.split('?');

      if (!STORY_FILE.test(filename)) {
        return null;
      }

      const result = await babel.transformAsync(code, {
        filename,
        babelrc: false,
        configFile: false,
        sourceMaps: true,
        compact: false,
        retainLines: true,
        parserOpts: { plugins: ['typescript', 'jsx'] },
        plugins: [
          [
            pluginPath,
            {
              importMappings: options.importMappings,
              cssModules: options.cssModules ?? false,
              storyGranularity: 'story',
            },
          ],
        ],
      });

      if (!result?.code) {
        return null;
      }

      return { code: result.code, map: result.map };
    },
  };
}
