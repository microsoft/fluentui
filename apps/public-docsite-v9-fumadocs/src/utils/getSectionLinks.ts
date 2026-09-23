import type { Item, Root } from 'fumadocs-core/page-tree';
import { findDocsFolder } from './findDocsFolder';

export function getSectionLinks(tree: Root, url: string): Item[] {
  const folder = findDocsFolder(tree.children, url);

  if (!folder) {
    throw new Error(`No navigation section exists at ${url}`);
  }

  return folder.children.flatMap(node => {
    const page = node.type === 'folder' ? node.index : node.type === 'page' ? node : undefined;
    return page && page.url !== url ? [page] : [];
  });
}
