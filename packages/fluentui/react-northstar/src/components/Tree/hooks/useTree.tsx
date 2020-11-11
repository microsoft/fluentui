import * as React from 'react';
import { ObjectShorthandCollection } from '../../../types';
import { TreeItemProps } from '../TreeItem';
import { BaseFlatTree, BaseFlatTreeItem, flattenTree } from './flattenTree';
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

type GetItemById = (id: string) => BaseFlatTreeItem;

/**
 * This hook returns a stable `getItemById()` function that will lookup in latest `flatTree`.
 * This is used used to have stable callbacks that can be passed to React's Context.
 */
function useGetItemById(flatTree: BaseFlatTree): GetItemById {
  // An exception is thrown there to ensure that a proper callback will assigned to ref
  const callbackRef = React.useRef<GetItemById>(() => {
    throw new Error('Callback is not assigned yet');
  });
  // We are assigning a callback during render as it can be used during render and in event handlers
  callbackRef.current = itemId => {
    return flatTree[itemId];
  };
  return React.useCallback<GetItemById>((...args) => {
    return callbackRef.current(...args);
  }, []);
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

  // === provided keyboard navigation ===
  const { focusParent, focusFirstChild, siblingsExpand } = useTreeBehavior(
    getItemById,
    expandSiblings,
    props.exclusive,
    getItemRef,
  );

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
    siblingsExpand,
  };
}
