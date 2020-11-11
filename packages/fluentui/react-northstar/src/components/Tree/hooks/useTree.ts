import * as React from 'react';
import { ObjectShorthandCollection } from '../../../types';
import { TreeItemProps } from '../TreeItem';
import { flattenTree } from './flattenTree';
import { useGetItemById } from './useGetItemById';
import { useTreeActiveState } from './useTreeActiveState';
import { useTreeBehavior } from './useTreeBehavior';

export interface UseTreeOptions {
  /** Shorthand array of props for Tree. */
  items?: ObjectShorthandCollection<TreeItemProps>;
  /** Ids of expanded items. */
  activeItemIds?: string[];
  /** Initial activeItemIds value. */
  defaultActiveItemIds?: string[];
  /** Only allow one subtree to be expanded at a time. */
  exclusive?: boolean;
}

export function useTree(props: UseTreeOptions) {
  // reason for flattening: useTree returns a flat array of props for each tree item child,
  // this plays better with virtualization.
  const { flatTree, orderedItemIds } = React.useMemo(() => flattenTree(props.items), [props.items]);

  const getItemById = useGetItemById(flatTree);

  // We need this because we want to handle `expanded` prop on `items`, should be deprecated and removed
  const deprecated_initialActiveItemIds = React.useMemo(() => {
    const initalValue = [];
    Object.keys(flatTree).forEach(key => {
      if (flatTree[key].expanded) {
        initalValue.push(key);
      }
    });
    return initalValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initialValue only needs to be computed on mount
  const { activeItemIds, toggleItemActive, expandSiblings } = useTreeActiveState(
    props,
    getItemById,
    deprecated_initialActiveItemIds,
  );

  // We want to set `visibleItemIds` to simplify rendering later
  // There is no sense to recreate a flat tree so we simply mutating it
  const visibleItemIds = React.useMemo(() => {
    const result = [];
    let i = 0;
    while (i < orderedItemIds.length) {
      const id = orderedItemIds[i];
      const item = flatTree[id];
      result.push(id);
      i++;
      if (activeItemIds.includes(id)) {
        flatTree[id].expanded = item.hasSubtree ? true : undefined;
      } else {
        flatTree[id].expanded = item.hasSubtree ? false : undefined;
        // item is collpased, so all its descendents are not visible
        while (i < orderedItemIds.length) {
          const nextItem = flatTree[orderedItemIds[i]];
          nextItem.expanded = item.hasSubtree ? false : undefined;
          if (nextItem?.level <= item.level) {
            break;
          }
          i++;
        }
      }
    }
    return result;
  }, [activeItemIds, flatTree, orderedItemIds]);

  // Maintains stable collection of refs to avoid unnecessary React context updates
  const nodes = React.useRef<Record<string, HTMLElement>>({});
  const registerItemRef = React.useCallback((id: string, node: HTMLElement) => {
    nodes.current[id] = node;
  }, []);
  const getItemRef = React.useCallback((id): HTMLElement => nodes.current[id], []);

  // === provide arrow left/right key navigation ===
  const { focusParent, focusFirstChild } = useTreeBehavior(getItemById, getItemRef);

  return {
    flatTree,
    orderedItemIds,
    getItemById,
    activeItemIds,
    visibleItemIds,
    registerItemRef,
    getItemRef,
    toggleItemActive,
    focusParent,
    focusFirstChild,
    expandSiblings,
  };
}
