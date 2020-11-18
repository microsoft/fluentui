import * as React from 'react';
import { useVirtualTree, UseVirtualTreeOptions } from '../VirtualizedTree/useVirtualTree';
import { TreeItemProps } from '@fluentui/react-northstar/src';

export interface UseVirtualStickyTreeOptions extends UseVirtualTreeOptions {
  /** height of list container */
  height: number;

  /** height of non-sticky items */
  itemSize: number;

  /** height of sticky items */
  stickyItemSize: number;
}

export interface VirtualNonStickyItemData {
  visibleItemIds: string[];
  createTreeItem: (id, style) => React.ReactElement<TreeItemProps> | null;
}

export function useVirtualStickyTree(props: UseVirtualStickyTreeOptions) {
  const { items, itemSize, stickyItemSize } = props;
  const stickyItemIds = React.useMemo(() => items.map(item => item.id), [items]);

  const baseTree = useVirtualTree({ ...props, defaultActiveItemIds: stickyItemIds });

  const {
    visibleItemIds,
    getItemById,
    listRef,
    activeItemIds,
    toggleItemActive: baseToggleItemActive,
    getItemRef,
  } = baseTree;

  const getItemSize = React.useCallback(
    (index: number) => {
      const id = visibleItemIds[index];

      const item = getItemById(id);
      if (item?.level === 1) {
        return stickyItemSize;
      }
      return itemSize;
    },
    [getItemById, itemSize, stickyItemSize, visibleItemIds],
  );
  React.useLayoutEffect(() => {
    (listRef.current as any)?.resetAfterIndex(0);
  }, [listRef, visibleItemIds]); // when item collapsed/expanded, refresh react-window itemSize cache

  const getItemKey = React.useCallback(
    (index: number, data: VirtualNonStickyItemData) => {
      const { visibleItemIds } = data;
      const id = visibleItemIds[index];
      if (getItemById(id)) {
        return id;
      }
      return index;
    },
    [getItemById],
  );

  // get an array of descendents ids for each of sticky item
  const stickyItemDescendents: string[][] = React.useMemo(() => {
    const stickyItemDescendents = new Array(stickyItemIds.length).fill(0).map(() => []);

    let stickyIndex = 0;
    visibleItemIds.forEach(id => {
      if (id === stickyItemIds[stickyIndex]) {
        stickyIndex++;
      } else {
        stickyItemDescendents[stickyIndex - 1].push(id);
      }
    });

    return stickyItemDescendents;
  }, [stickyItemIds, visibleItemIds]);

  const toggleItemActive = React.useCallback(
    (e: React.SyntheticEvent, idToToggle: string) => {
      if (getItemById(idToToggle).level === 1 && !activeItemIds.includes(idToToggle)) {
        // item is sticky and is to be expanded, scroll as if this item is sticked to top
        let i = 0;
        let scrollOffset = 0;
        while (idToToggle !== stickyItemIds[i]) {
          scrollOffset += stickyItemDescendents[i].length * itemSize;
          i++;
        }
        (listRef.current as any)?.scrollTo(scrollOffset);
      }

      baseToggleItemActive(e, idToToggle);
    },
    [activeItemIds, baseToggleItemActive, getItemById, itemSize, listRef, stickyItemDescendents, stickyItemIds],
  );

  // When using keyboard, and navigate to non-sticky items, they could be hidden behind sticky headers.
  // Scroll to make the focused non-sticky items always visible
  const isOverlappingWithSticky = React.useCallback(
    (id: string) => {
      const itemRect = getItemRef(id)?.getBoundingClientRect();
      for (const stickyId of stickyItemIds) {
        const stickyRect = getItemRef(stickyId)?.getBoundingClientRect();
        if (overlap(itemRect, stickyRect)) {
          return true;
        }
      }
      return false;
    },
    [getItemRef, stickyItemIds],
  );
  const makeVisibleOnFocus = React.useCallback(
    (id: string, level: number) => {
      if (level === 1) {
        return; // focused sticky items are always visible, so no need to deal with them
      }

      if (isOverlappingWithSticky(id)) {
        listRef.current.scrollToItem(visibleItemIds.indexOf(id), 'center'); // scroll to item
      }
    },
    [isOverlappingWithSticky, listRef, visibleItemIds],
  );

  return {
    ...baseTree,
    getItemSize,
    getItemKey,
    stickyItemIds,
    stickyItemDescendents,
    toggleItemActive,
    makeVisibleOnFocus,
  };
}

const overlap = (rect1, rect2) => !(rect1?.bottom <= rect2?.top || rect1?.top >= rect2?.bottom);
