import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { TreeItemId, TreeOpenChangeData, TreeOpenChangeEvent, TreeProps } from '../Tree';
import { TreeItemProps } from '../TreeItem';
import { ImmutableSet } from '../utils/ImmutableSet';
import { updateOpenItems } from '../utils/updateOpenItems';

export type FlatTreeItem = Required<Pick<TreeItemProps, 'leaf' | 'aria-level' | 'aria-setsize' | 'aria-posinset'>> &
  TreeItemProps & {
    parentId?: string;
  };

export function useFlatTreeItems_unstable(
  items: FlatTreeItem[],
): readonly [Pick<TreeProps, 'openItems' | 'onOpenChange'>, () => FlatTreeItem[]] {
  const [openItems, setOpenItems] = React.useState<ImmutableSet<TreeItemId>>(ImmutableSet.emptySet);
  const onOpenChange = useEventCallback((ev: TreeOpenChangeEvent, data: TreeOpenChangeData) =>
    setOpenItems(curr => updateOpenItems(data, curr)),
  );

  const treeItemMap = React.useMemo(() => initializeFlatTreeItemMap(items), [items]);

  const getVisibleItems = () => items.filter(item => isTreeItemVisible(item, { openItems, map: treeItemMap }));

  return [{ openItems, onOpenChange }, getVisibleItems];
}

function initializeFlatTreeItemMap(items: FlatTreeItem[]): Map<string, FlatTreeItem> {
  const map = new Map<string, FlatTreeItem>();
  for (const item of items) {
    if (item.id !== undefined) {
      map.set(item.id, item);
    }
  }
  return map;
}

function isTreeItemVisible(
  item: FlatTreeItem,
  {
    openItems,
    map,
  }: {
    openItems: ImmutableSet<TreeItemId>;
    map: Map<string, FlatTreeItem>;
  },
) {
  if (item['aria-level'] === 1) {
    return true;
  }
  let { parentId } = item;
  while (parentId !== undefined) {
    if (!openItems.has(parentId)) {
      return false;
    }
    parentId = map.get(parentId)?.parentId;
  }
  return true;
}
