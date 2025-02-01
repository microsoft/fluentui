import { HeadlessFlatTreeItemProps } from '../FlatTree';
import { TreeItemProps, TreeItemValue } from '../TreeItem';

/**
 * @deprecated - deprecating in favor of user flattening its custom data structure on its own
 */
export type FlattenTreeItem<Props extends TreeItemProps> = Omit<Props, 'subtree' | 'itemType'> & {
  value: TreeItemValue;
  subtree?: FlattenTreeItem<Props>[];
};

/**
 * @deprecated - deprecating in favor of user flattening its custom data structure on its own
 */
export type FlattenedTreeItem<Props extends TreeItemProps> = HeadlessFlatTreeItemProps & Props;

function flattenTreeRecursive<Props extends TreeItemProps>(
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  items: FlattenTreeItem<Props>[],
  parent?: HeadlessFlatTreeItemProps & Props,
  level = 1,
  // eslint-disable-next-line @typescript-eslint/no-deprecated
): FlattenedTreeItem<Props>[] {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  return items.reduce<FlattenedTreeItem<Props>[]>((acc, { subtree, ...item }, index) => {
    const flatTreeItem = {
      'aria-level': level,
      'aria-posinset': index + 1,
      'aria-setsize': items.length,
      parentValue: parent?.value,
      ...item,
      // eslint-disable-next-line @typescript-eslint/no-deprecated
    } as FlattenedTreeItem<Props>;
    acc.push(flatTreeItem);
    if (subtree !== undefined) {
      acc.push(...flattenTreeRecursive<Props>(subtree, flatTreeItem, level + 1));
    }
    return acc;
  }, []);
}

/**
 *
 * @deprecated - deprecating in favor of user flattening its custom data structure on its own
 *
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
export const flattenTree_unstable = <Props extends TreeItemProps>(
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  items: FlattenTreeItem<Props>[],
  // eslint-disable-next-line @typescript-eslint/no-deprecated
): FlattenedTreeItem<Props>[] => flattenTreeRecursive(items);
