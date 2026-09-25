import type { Folder, Node } from 'fumadocs-core/page-tree';

export function findDocsFolder(nodes: Node[], url: string): Folder | undefined {
  for (const node of nodes) {
    if (node.type !== 'folder') {
      continue;
    }

    if (node.index?.url === url) {
      return node;
    }

    const found = findDocsFolder(node.children, url);

    if (found) {
      return found;
    }
  }
  return undefined;
}
