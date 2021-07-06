import * as React from 'react';
import { useTree, UseTreeResult, UseTreeOptions } from './useTree';
import { ShorthandValue } from '../../../types';
import { TreeItemProps } from '../TreeItem';

export interface UseVirtualTreeOptions extends Omit<UseTreeOptions, 'selectedItemIds' | 'defaultSelectedItemIds'> {
  /**
   * A function that converts an item to string. Used for keyboard navigation based on the first letter of an item's text content
   */
  itemToString?: (item: ShorthandValue<TreeItemProps>) => string;
}

export interface UseVirtualTreeResult extends UseTreeResult {
  /** ref to be assigned to react-window VariableSizeList/FixedSizeList component */
  listRef: React.MutableRefObject<any>;
}

// export our own interface that is similar to react-window VariableSizeList,
//  to avoid dependency to react-window
export interface VariableSizeListRef extends React.Component<any> {
  scrollTo(scrollOffset: number): void;
  scrollToItem(index: number, align?: 'auto' | 'smart' | 'center' | 'end' | 'start'): void;

  resetAfterIndex(index: number, shouldForceUpdate?: boolean): void;
}

export function useVirtualTree(props: UseVirtualTreeOptions): UseVirtualTreeResult {
  const baseTree = useTree(props);
  const {
    registerItemRef: baseRegisterItemRef,
    expandSiblings: baseExpandSiblings,
    getItemById,
    getItemRef,
    visibleItemIds,
  } = baseTree;

  const listRef = React.useRef<VariableSizeListRef>();
  const focusIdRef = React.useRef<string>();

  const focusItemById = React.useCallback(
    (id: string) => {
      const itemRef = getItemRef(id);

      // item is not mounted yet
      if (itemRef == null) {
        // set focusIdRef so item can be focused on mount; then scroll to item
        focusIdRef.current = id;
        const focusIndex = visibleItemIds.indexOf(focusIdRef.current);
        if (focusIndex >= 0) {
          listRef.current?.scrollToItem(focusIndex, 'center');
        }
        return;
      }

      // item is mounted, set focus
      if (getItemById(id)?.hasSubtree) {
        itemRef.focus();
      } else {
        // when tree item is leaf, need to focus on the inner treeTitle
        (itemRef.firstElementChild as HTMLElement)?.focus();
      }
    },
    [getItemById, getItemRef, visibleItemIds],
  );

  const registerItemRef = React.useCallback(
    (id: string, node: HTMLElement) => {
      baseRegisterItemRef(id, node);
      if (node && focusIdRef.current === id) {
        // focus on this tree item
        if (getItemById(id)?.hasSubtree) {
          node.focus();
        } else {
          // when node is leaf, need to focus on the inner treeTitle
          (node.firstElementChild as HTMLElement)?.focus();
        }
        focusIdRef.current = null;
      }
    },
    [baseRegisterItemRef, getItemById],
  );

  const expandSiblings = React.useCallback(
    (e: React.KeyboardEvent, id: string) => {
      baseExpandSiblings(e, id);
      focusIdRef.current = id;
    },
    [baseExpandSiblings],
  );

  React.useLayoutEffect(() => {
    /**
     * Reason for scroll in useLayoutEffect:
     * Without useLayoutEffect, scrolling works for focus parent and focus first child, but it is problematic for expanding sibings.
     * When focus parent/child, the number of items (itemCount) in the virtual list does not change. But when sibling expand, itemCount could change.
     * When siblings are expanded:
     *  without useLayoutEffect, react window uses the itemCount before siblings are expanded, causing it to compute wrong scroll offset.
     *  with useLayoutEffect, the scrolling happens after the new itemCount passed into list as props. Therefore the computed scroll offset is correct.
     */
    if (focusIdRef.current != null && getItemRef(focusIdRef.current) == null) {
      const focusIndex = visibleItemIds.indexOf(focusIdRef.current);
      if (focusIndex >= 0) {
        listRef.current?.scrollToItem(focusIndex, 'center');
      }
    }
  }, [getItemRef, visibleItemIds]);

  const searchByFirstChar = React.useCallback(
    (startIndex: number, endIndex: number, char: string) => {
      const itemToString = props.itemToString || (item => (item as any).content || '');
      for (let i = startIndex; i < endIndex; ++i) {
        const itemFirstChar = itemToString(getItemById(visibleItemIds[i]).item)?.trim()?.charAt(0)?.toLowerCase();
        if (itemFirstChar === char.toLowerCase()) {
          return i;
        }
      }
      return -1;
    },
    [getItemById, props.itemToString, visibleItemIds],
  );

  const getToFocusIDByFirstCharacter = React.useCallback(
    (e: React.KeyboardEvent, idToStartSearch: string) => {
      // Get start index for search
      let starIndex = visibleItemIds.indexOf(idToStartSearch) + 1;
      if (starIndex === visibleItemIds.length) {
        starIndex = 0;
      }

      // Check following nodes in tree
      let toFocusIndex = searchByFirstChar(starIndex, visibleItemIds.length, e.key);
      // If not found in following nodes, check from beginning
      if (toFocusIndex === -1) {
        toFocusIndex = searchByFirstChar(0, starIndex - 1, e.key);
      }

      if (toFocusIndex === -1) {
        return idToStartSearch;
      }

      return visibleItemIds[toFocusIndex];
    },
    [searchByFirstChar, visibleItemIds],
  );

  return {
    ...baseTree,
    registerItemRef,
    focusItemById,
    expandSiblings,
    getToFocusIDByFirstCharacter,
    listRef,
  };
}
