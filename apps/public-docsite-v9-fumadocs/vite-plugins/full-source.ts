import type { Plugin } from 'vite';
import { createRequire } from 'node:module';

import * as babel from '@babel/core';
import { localStorySource } from './local-story-source.ts';

const require = createRequire(import.meta.url);
const sourcePlugin = require.resolve('@fluentui/babel-preset-storybook-full-source');

const STORY_FILE = /\.stories\.(?:jsx?|tsx?)$/;

export interface FullSourceOptions {
  importMappings: Record<string, { replace: string }>;
  cssModules?: boolean | { tokensFilePath?: string };
}

/**
 * Attaches `parameters.fullSource` (and `parameters.cssModuleSources`) to every story
 * export. Ordinary stories use the upstream Storybook plugin; stories with local helpers
 * use a docsite-only metadata pass sharing its slicer and import-rewriting helpers.
 *
 * Unlike the Storybook webpack rule, Babel is invoked with only the source metadata plugin, so
 * there is no need to strip the Griffel/v9 presets first — this is a pure AST-inject
 * pass that leaves TS/JSX intact for esbuild to transpile afterwards.
 */
export function fullSource(options: FullSourceOptions): Plugin {
  return {
    name: 'fluentui:full-source',
    enforce: 'pre',

    async transform(code, id) {
      const [filename] = id.split('?');

      if (
        !STORY_FILE.test(filename) ||
        filename.replace(/\\/g, '/').includes('/public-docsite-v9-fumadocs/src/examples/')
      ) {
        return null;
      }

      const normalizedFilename = filename.replace(/\\/g, '/');
      const inlineLocalImports =
        normalizedFilename.includes('/react-headless-components-preview/stories/') ||
        normalizedFilename.endsWith('/react-tree/stories/src/Tree/TreeLazyLoading.stories.tsx');

      const result = await babel.transformAsync(code, {
        filename,
        babelrc: false,
        configFile: false,
        sourceMaps: true,
        compact: false,
        retainLines: true,
        parserOpts: { plugins: ['typescript', 'jsx'] },
        plugins: inlineLocalImports
          ? [() => localStorySource(options)]
          : [
              [
                sourcePlugin,
                {
                  ...options,
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
