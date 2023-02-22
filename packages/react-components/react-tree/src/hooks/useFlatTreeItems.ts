import { useEventCallback } from '@fluentui/react-utilities';
import * as React from 'react';
import { TreeItemId, TreeOpenChangeData, TreeOpenChangeEvent, TreeProps } from '../Tree';
import { TreeItemProps } from '../TreeItem';
import { ImmutableSet } from '../utils/ImmutableSet';
import { updateOpenItems } from '../utils/updateOpenItems';

export type FlatTreeItem = Required<Pick<TreeItemProps, 'id'>> &
  TreeItemProps & {
    parentId?: string;
  };

type FlatTreeItemWithRequiredProps = FlatTreeItem &
  Required<Pick<TreeItemProps, 'aria-level' | 'aria-setsize' | 'aria-posinset' | 'leaf'>>;

type FlatTreeItemWithoutSetSize = FlatTreeItem &
  Omit<FlatTreeItemWithRequiredProps, 'aria-setsize'> & { childrenSize: number };

export function useFlatTreeItems_unstable(
  items: FlatTreeItem[],
): readonly [Pick<TreeProps, 'openItems' | 'onOpenChange'>, () => FlatTreeItemWithRequiredProps[]] {
  const [openItems, setOpenItems] = React.useState<ImmutableSet<TreeItemId>>(ImmutableSet.emptySet);
  const onOpenChange = useEventCallback((ev: TreeOpenChangeEvent, data: TreeOpenChangeData) =>
    setOpenItems(curr => updateOpenItems(data, curr)),
  );

  const root: FlatTreeItemWithoutSetSize = {
    id: 'root',
    'aria-level': 0,
    childrenSize: 0,
    'aria-posinset': 0,
    leaf: false,
  };
  const itemsWithoutSetSizePerId = new Map<string, FlatTreeItemWithoutSetSize>();
  const itemsWithoutSetSize: FlatTreeItemWithoutSetSize[] = [];

  for (let index = 0; index < items.length; index++) {
    const currentPartialItem = items[index];
    const nextPartialItem = items[index + 1] as FlatTreeItem | undefined;
    const currentParent = currentPartialItem.parentId
      ? itemsWithoutSetSizePerId.get(currentPartialItem.parentId) ?? root
      : root;
    const isLeaf = nextPartialItem?.parentId !== currentPartialItem.id;
    const currentLevel = currentParent['aria-level'] + 1;
    currentParent.childrenSize++;

    const item: FlatTreeItemWithoutSetSize = {
      ...currentPartialItem,
      'aria-level': currentLevel,
      'aria-posinset': currentParent.childrenSize,
      childrenSize: 0,
      leaf: isLeaf,
    };
    itemsWithoutSetSizePerId.set(item.id, item);
    itemsWithoutSetSize.push(item);
  }

  const getVisibleItems = () => {
    const itemsWithRequiredProps: FlatTreeItemWithRequiredProps[] = [];
    for (let index = 0; index < itemsWithoutSetSize.length; index++) {
      const currentItem = itemsWithoutSetSize[index];
      const currentParent = currentItem.parentId ? itemsWithoutSetSizePerId.get(currentItem.parentId) : root;

      // This indicates that an item doesn't have a proper parent
      if (currentParent === undefined) {
        // TODO: throw perhaps?
        continue;
      }

      const flatTreeItem = currentItem as FlatTreeItemWithRequiredProps;
      flatTreeItem['aria-setsize'] = currentParent.childrenSize;

      if (isTreeItemVisible(flatTreeItem, { openItems, map: itemsWithoutSetSizePerId })) {
        itemsWithRequiredProps.push(flatTreeItem);
      } else {
        index += currentParent.childrenSize - 1 + currentItem.childrenSize;
      }
    }
    return itemsWithRequiredProps;
  };

  return [{ openItems, onOpenChange }, getVisibleItems];
}

function isTreeItemVisible(
  item: FlatTreeItemWithRequiredProps,
  {
    openItems,
    map,
  }: {
    openItems: ImmutableSet<TreeItemId>;
    map: Map<string, FlatTreeItemWithoutSetSize>;
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
