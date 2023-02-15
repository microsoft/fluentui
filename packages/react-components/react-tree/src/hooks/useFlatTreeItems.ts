import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { TreeOpenChangeData, TreeOpenChangeEvent, TreeProps } from '../Tree';
import { TreeItemProps } from '../TreeItem';
import { updateOpenItems } from '../utils/updateOpenItems';

export type FlatTreeItem = Required<Pick<TreeItemProps, 'leaf' | 'aria-level' | 'aria-setsize' | 'aria-posinset'>> &
  TreeItemProps & {
    parentId?: string;
  };

export function useFlatTreeItems_unstable(
  items: FlatTreeItem[],
): readonly [Pick<TreeProps, 'openItems' | 'onOpenChange'>, () => FlatTreeItem[]] {
  const [openItems, setOpenItems] = React.useState<string[]>([]);
  const onOpenChange = useEventCallback((ev: TreeOpenChangeEvent, data: TreeOpenChangeData) => {
    setOpenItems(curr => updateOpenItems(data, curr));
  });

  const map = React.useMemo(() => initializeFlatTreeItemMap(items), [items]);

  const getVisibleItems = () =>
    items.filter(item => item['aria-level'] === 1 || includesAllParentIds(item, { openItems, map }));

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

type IncludesAllParentIdsOptions = {
  openItems: string[];
  map: Map<string, FlatTreeItem>;
};

function includesAllParentIds(item: FlatTreeItem, { openItems, map }: IncludesAllParentIdsOptions) {
  let { parentId } = item;
  while (parentId !== undefined) {
    if (!openItems.includes(parentId)) {
      return false;
    }
    parentId = map.get(parentId)?.parentId;
  }
  return true;
}
