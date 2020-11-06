import * as React from 'react';
import { SelectableFlatTreeItem, useTreeSelectState } from './useTreeSelectState';
import { useTree, UseTreeOptions } from './useTree';
import { SECRET_ROOT_ID } from './flattenTree';

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
  const { getItemById, flatTree } = baseTree;

  const { selectedItemIds, toggleItemSelect } = useTreeSelectState(props, getItemById);

  // We want to set `selected` value on all items to simplify rendering later
  // There is no sense to recreate a flat tree so we simply mutating it
  React.useMemo(() => {
    Object.keys(flatTree).forEach(id => {
      (flatTree[id] as SelectableFlatTreeItem).selected = false;
    });
    selectedItemIds.forEach(id => {
      if (!flatTree[id].hasSubtree) {
        (flatTree[id] as SelectableFlatTreeItem).selected = true;
      }
    });

    // traverse all tree nodes in updatedFlatTree for once,
    // to calculate the selection state of the parent nodes based on leaf nodes
    const traverseTree = nodes => {
      let allNodesSelected = true;
      let noNodeSelected = true;

      nodes?.forEach(id => {
        const item = flatTree[id] as SelectableFlatTreeItem;
        if (item.hasSubtree && item.childrenIds) {
          item.selected = traverseTree(item.childrenIds);
        }

        if (item.selected === true) {
          noNodeSelected = false;
        } else if (item.selected === 'indeterminate') {
          allNodesSelected = false;
          noNodeSelected = false;
        } else {
          allNodesSelected = false;
        }
      });

      if (allNodesSelected) return true;
      if (noNodeSelected) return false;
      return 'indeterminate';
    };

    traverseTree(flatTree[SECRET_ROOT_ID].childrenIds);
  }, [flatTree, selectedItemIds]);

  return {
    ...baseTree,
    toggleItemSelect,
  };
}
