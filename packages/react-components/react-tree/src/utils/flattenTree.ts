import { FlatTreeItemProps } from '../hooks/useFlatTree';
import { TreeItemProps } from '../TreeItem';

export type NestedTreeItem = Omit<TreeItemProps, 'subtree'> & {
  subtree?: NestedTreeItem[];
};

let count = 1;
function flattenTreeRecursive(items: NestedTreeItem[], parent?: FlatTreeItemProps, level = 1): FlatTreeItemProps[] {
  return items.reduce<FlatTreeItemProps[]>((acc, { subtree, ...item }, index) => {
    const flatTreeItem: FlatTreeItemProps = {
      'aria-level': level,
      'aria-posinset': index + 1,
      'aria-setsize': items.length,
      parentId: parent?.id,
      id: item.id ?? `fui-FlatTreeItem-${count++}`,
      leaf: subtree === undefined,
      ...item,
    };
    acc.push(flatTreeItem);
    if (subtree !== undefined) {
      acc.push(...flattenTreeRecursive(subtree, flatTreeItem, level + 1));
    }
    return acc;
  }, []);
}

/**
 * Converts a nested structure to a flat one which can be consumed by `useFlatTreeItems`
 * @example
 * ```tsx
 * const defaultItems = flattenTree_unstable([
 *  {
 *    children: <TreeItemLayout>level 1, item 1</TreeItemLayout>,
 *    subtree: [
 *      {
 *        children: <TreeItemLayout>level 2, item 1</TreeItemLayout>,
 *      },
 *      {
 *        children: <TreeItemLayout>level 2, item 2</TreeItemLayout>,
 *      },
 *      {
 *        children: <TreeItemLayout>level 2, item 3</TreeItemLayout>,
 *      },
 *    ],
 *  },
 *  {
 *    children: <TreeItemLayout>level 1, item 2</TreeItemLayout>,
 *    subtree: [
 *      {
 *        children: <TreeItemLayout>level 2, item 1</TreeItemLayout>,
 *        subtree: [
 *          {
 *            children: <TreeItemLayout>level 3, item 1</TreeItemLayout>,
 *            subtree: [
 *              {
 *                children: <TreeItemLayout>level 4, item 1</TreeItemLayout>,
 *              },
 *            ],
 *          },
 *        ],
 *      },
 *    ],
 *  },
 * ]);
 * ```
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const flattenTree_unstable = (items: NestedTreeItem[]): FlatTreeItemProps[] => flattenTreeRecursive(items);
