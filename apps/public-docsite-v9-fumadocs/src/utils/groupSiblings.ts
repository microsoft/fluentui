import type { Folder, Item, Node } from 'fumadocs-core/page-tree';

export function groupSiblings(nodes: Node[]): Node[] {
  const families = new Map<Item, Folder>();

  for (const node of nodes) {
    if (node.type !== 'folder' || node.index || !node.$ref?.folder) {
      continue;
    }

    const page = nodes.find(
      (sibling): sibling is Item =>
        sibling.type === 'page' && sibling.$ref?.replace(/\.mdx?$/, '') === node.$ref?.folder,
    );
    if (page) {
      families.set(page, node);
    }
  }

  const mergedFolders = new Set(families.values());
  return nodes
    .filter(node => node.type !== 'folder' || !mergedFolders.has(node))
    .map(node => {
      if (node.type === 'page') {
        const folder = families.get(node);
        if (folder) {
          return {
            ...folder,
            name: node.name,
            collapsible: true,
            index: node,
            children: groupSiblings(folder.children),
          };
        }
      }
      if (node.type === 'folder') {
        return { ...node, children: groupSiblings(node.children) };
      }
      return node;
    });
}
