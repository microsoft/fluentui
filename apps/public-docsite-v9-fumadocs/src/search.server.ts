/**
 * Generates the search index in Node during development and build-time static prerendering.
 * The .server.ts suffix keeps this code out of browser bundles; production serves the generated index file.
 */
import { createSearchAPI } from 'fumadocs-core/search/server';
import type { AdvancedIndex } from 'fumadocs-core/search/server';
import { sources } from './source.server';
import { createDocsTree } from './utils/createDocsTree';
import type { Root } from 'fumadocs-core/page-tree';

export const searchServer = createSearchAPI('advanced', {
  async indexes(): Promise<AdvancedIndex[]> {
    const indexes: AdvancedIndex[] = [];
    for (const [collection, source] of Object.entries(sources)) {
      const paths = new Map<string, string[]>();
      const overviews = new Set<string>();
      function walk(nodes: Root['children'], ancestors: string[] = []) {
        for (const node of nodes) {
          if (node.type === 'folder') {
            if (node.index) {
              paths.set(node.index.url, ancestors);
              if (node.index.$ref?.endsWith('/index.mdx')) {
                overviews.add(node.index.url);
              }
            }
            walk(node.children, [...ancestors, String(node.name)]);
          } else if (node.type === 'page') {
            paths.set(node.url, ancestors);
          }
        }
      }

      walk(createDocsTree(source.pageTree).children);

      for (const page of source.getPages()) {
        const component = page.path.startsWith('components/');
        const kind = overviews.has(page.url)
          ? component && page.path !== 'components/index.mdx'
            ? 'Family overview'
            : 'Section overview'
          : component
          ? 'Component reference'
          : page.slugs.length === 0
          ? 'Home'
          : 'Guide';
        indexes.push({
          id: page.url,
          url: page.url,
          title: page.data.title,
          description: page.data.description,
          tag: collection,
          breadcrumbs: [...(paths.get(page.url) ?? []), kind],
          structuredData: await page.data.structuredData(),
        });
      }
    }
    return indexes;
  },
});
