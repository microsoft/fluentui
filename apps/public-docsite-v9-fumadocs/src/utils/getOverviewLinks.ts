import type { Item, Root } from 'fumadocs-core/page-tree';
import { getCatalogLinks } from './getCatalogLinks';
import { getSectionLinks } from './getSectionLinks';

export function getOverviewLinks(
  tree: Root,
  url: string,
  pages: Parameters<typeof getCatalogLinks>[0],
  catalog = false,
): Item[] {
  const sections = getSectionLinks(tree, url);
  return catalog
    ? [
        ...getCatalogLinks(pages),
        ...sections.filter(page => /\/(compat-components|preview-components|tags)$/.test(page.url)),
      ]
    : sections;
}
