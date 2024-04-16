import type { TreeItemProps, TreeItemValue } from '../TreeItem/TreeItem.types';

/**
 * FlatTreeItem Props
 */
export type FlatTreeItemProps = TreeItemProps & {
  value: TreeItemValue;
  'aria-level': number;
  'aria-setsize': number;
  'aria-posinset': number;
};
