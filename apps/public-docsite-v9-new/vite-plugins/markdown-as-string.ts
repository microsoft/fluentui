import { readFile } from 'node:fs/promises';
import { isAbsolute, resolve as resolvePath, dirname, sep } from 'node:path';

import type { Plugin } from 'vite';

const MARKDOWN_FILE = /\.md$/;
const VIRTUAL_PREFIX = '\0fluentui-raw-md:';

/**
 * Mirrors Storybook's `{ test: /\.md$/, type: 'asset/source' }` rule (design D1).
 *
 * Story entry points compose their component description by importing sibling Markdown
 * files as strings. Both hosts must resolve those imports identically, otherwise the
 * documentation site and the workbench render different descriptions.
 *
 * The import is redirected to a virtual module rather than served from the `.md` path
 * directly. Returning source for the real path is not enough: `fumadocs-mdx` also claims
 * `.md`, and its transform would then compile the string back into an MDX component — which
 * is how descriptions previously ended up rendering as `function MDXContent(...)` source
 * text instead of prose. A virtual id cannot match its file filter.
 */
export function markdownAsString(): Plugin {
  return {
    name: 'fluentui:markdown-as-string',
    enforce: 'pre',

    resolveId(source, importer) {
      if (!MARKDOWN_FILE.test(source) || !importer) {
        return null;
      }

      const absolute = isAbsolute(source) ? source : resolvePath(dirname(importer), source);

      // Documentation pages themselves are Fumadocs content; only sibling Markdown
      // imported by story modules is treated as a raw string.
      if (absolute.includes(`${sep}content${sep}`)) {
        return null;
      }

      return VIRTUAL_PREFIX + Buffer.from(absolute).toString('base64url');
    },

    async load(id) {
      if (!id.startsWith(VIRTUAL_PREFIX)) {
        return null;
      }

      const absolute = Buffer.from(id.slice(VIRTUAL_PREFIX.length), 'base64url').toString('utf8');
      const source = await readFile(absolute, 'utf8');

      return { code: `export default ${JSON.stringify(source)};`, map: null };
    },
  };
}
