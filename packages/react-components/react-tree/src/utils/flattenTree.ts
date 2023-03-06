import { FlatTreeItem } from '../hooks/useFlatTreeItems';
import { TreeItemProps } from '../TreeItem';

export type NestedTreeItem = Omit<TreeItemProps, 'subtree'> & {
  subtree?: NestedTreeItem[];
};

let count = 1;

// eslint-disable-next-line @typescript-eslint/naming-convention
function flattenTreeRecursive_unstable(items: NestedTreeItem[], parent?: FlatTreeItem, level = 1): FlatTreeItem[] {
  const flatTreeItems: FlatTreeItem[] = [];
  for (let index = 0; index < items.length; index++) {
    const { subtree, ...item } = items[index];
    const flatTreeItem: FlatTreeItem = {
      'aria-level': level,
      'aria-posinset': index + 1,
      'aria-setsize': items.length,
      parentId: parent?.id,
      id: item.id ?? `fui-FlatTreeItem-${count++}`,
      leaf: subtree === undefined,
      ...item,
    };
    flatTreeItems.push(flatTreeItem);
    if (subtree !== undefined) {
      flatTreeItems.push(...flattenTreeRecursive_unstable(subtree, flatTreeItem, level + 1));
    }
  }
  return flatTreeItems;
}

/**
 * Converts a nested structure to a flat one which can be consumed by `useFlatTreeItems`
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const flattenTree_unstable: (items: NestedTreeItem[]) => FlatTreeItem[] = flattenTreeRecursive_unstable;
