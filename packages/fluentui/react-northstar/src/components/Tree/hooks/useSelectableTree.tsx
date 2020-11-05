import * as React from 'react';
import { BaseFlatTreeItem } from './flattenTree';
import { useTreeSelectState } from './useTreeSelectState';
import { useTree, UseTreeOptions } from './useTree';

export type SelectableFlatTreeItem = BaseFlatTreeItem & {
  /**
   * when selected=true, the tree item is fully selected, indicating all its descendents are fully selected;
   * when selected=false, the tree item is not selected, indicating none of its descendents is selected;
   * when selected='indeterminate', only part of the tree item's descendents are selected
   */
  selected?: boolean | 'indeterminate';
};

export interface UseSelectableTreeOptions extends UseTreeOptions {
  /** Whether or not tree items are selectable. */
  selectable?: boolean;
  /** Ids of selected leaf items. */
  selectedItemIds?: string[];
  /** Initial selectedItemIds value. */
  defaultSelectedItemIds?: string[];
}

export function useSelectableTree(props: UseSelectableTreeOptions) {
  const baseTree = useTree(props);
  const { flatTree: baseflatTree, tobeRenderedItemsProps } = baseTree;

  const { selectedItemIds, flatTree, toggleSelect } = useTreeSelectState(props, baseflatTree);

  React.useMemo(() => {
    tobeRenderedItemsProps.forEach(itemProps => {
      // tree item is selectable when it is in a selectable tree, and does not receive selectable=false prop
      itemProps.selectable = props.selectable ? itemProps.selectable !== false : false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tobeRenderedItemsProps, flatTree]);

  const getItemById = React.useCallback(id => flatTree[id], [flatTree]);

  return {
    ...baseTree,
    flatTree,
    selectedItemIds,
    tobeRenderedItemsProps,
    toggleSelect,
    getItemById,
  };
}
