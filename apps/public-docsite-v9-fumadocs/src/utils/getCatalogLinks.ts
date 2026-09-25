import type { Item } from 'fumadocs-core/page-tree';

export function getCatalogLinks(pages: { path: string; url: string; data: { title: string } }[]): Item[] {
  return pages
    .filter(
      page =>
        page.path.startsWith('components/') &&
        !page.path.endsWith('/index.mdx') &&
        !/^components\/(compat-components|preview-components)\//.test(page.path),
    )
    .sort((a, b) => a.data.title.localeCompare(b.data.title))
    .map(page => ({ type: 'page', name: page.data.title, url: page.url }));
}
