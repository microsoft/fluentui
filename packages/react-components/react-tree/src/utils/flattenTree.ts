import * as React from 'react';
import { FlatTreeItemProps } from '../hooks/useFlatTreeItems';
import { TreeProps } from '../Tree';
import { TreeItemProps } from '../TreeItem';

export type NestedTreeItem = Omit<TreeItemProps, 'subtree'> & {
  subtree?: NestedTreeItem[];
};

let count = 1;

// eslint-disable-next-line @typescript-eslint/naming-convention
function flattenTreeRecursive_unstable(
  items: NestedTreeItem[],
  parent?: FlatTreeItemProps,
  level = 1,
): FlatTreeItemProps[] {
  const flatTreeItems: FlatTreeItemProps[] = [];
  for (let index = 0; index < items.length; index++) {
    const { subtree, ...item } = items[index];
    const flatTreeItem: FlatTreeItemProps = {
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
// eslint-disable-next-line @typescript-eslint/naming-convention
function flattenTreeFromElementsRecursive_unstable(
  tree: React.ReactElement<TreeProps>,
  parent?: FlatTreeItemProps,
  level = 1,
): FlatTreeItemProps[] {
  const items = (Array.isArray(tree.props.children)
    ? tree.props.children
    : [tree.props.children]) as React.ReactElement<TreeItemProps>[];
  const flatTreeItems: FlatTreeItemProps[] = [];

  for (let index = 0; index < items.length; index++) {
    const item = items[index];
    const [children, subtreeChildren] = React.Children.toArray(item.props.children);
    const subtree = subtreeChildren as React.ReactElement<TreeProps> | undefined;
    const flatTreeItem: FlatTreeItemProps = {
      'aria-level': level,
      'aria-posinset': index + 1,
      'aria-setsize': items.length,
      parentId: parent?.id,
      id: item.props.id ?? `fui-FlatTreeItem-${count++}`,
      leaf: subtree === undefined,
      ...item.props,
      children,
    };
    flatTreeItems.push(flatTreeItem);
    if (subtree !== undefined) {
      flatTreeItems.push(...flattenTreeFromElementsRecursive_unstable(subtree, flatTreeItem, level + 1));
    }
  }
  return flatTreeItems;
}

/**
 * Converts a nested structure to a flat one which can be consumed by `useFlatTreeItems`
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const flattenTree_unstable: (items: NestedTreeItem[]) => FlatTreeItemProps[] = flattenTreeRecursive_unstable;

/**
 * Converts a nested structure in the form of JSX elements to a flat one which can be consumed by `useFlatTreeItems`
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const flattenTreeFromElements_unstable: (
  tree: React.ReactElement<TreeProps>,
) => FlatTreeItemProps[] = flattenTreeFromElementsRecursive_unstable;
