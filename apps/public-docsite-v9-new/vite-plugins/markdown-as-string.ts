import { readFile } from 'node:fs/promises';

import type { Plugin } from 'vite';

const MARKDOWN_FILE = /\.md$/;

/**
 * Mirrors Storybook's `{ test: /\.md$/, type: 'asset/source' }` rule (design D1).
 *
 * Story entry points compose their component description by importing sibling Markdown
 * files as strings. Both hosts must resolve those imports identically, otherwise the
 * documentation site and the workbench would render different descriptions.
 *
 * Vite's own `?raw` suffix is not usable here: the story files import plain `./X.md`
 * specifiers and must not be modified.
 */
export function markdownAsString(): Plugin {
  return {
    name: 'fluentui:markdown-as-string',
    enforce: 'pre',

    async load(id) {
      const [filename, query] = id.split('?');

      // Leave Vite's own explicit asset queries alone.
      if (query !== undefined || !MARKDOWN_FILE.test(filename)) {
        return null;
      }

      const source = await readFile(filename, 'utf8');

      return {
        code: `export default ${JSON.stringify(source)};`,
        map: null,
      };
    },
  };
}
