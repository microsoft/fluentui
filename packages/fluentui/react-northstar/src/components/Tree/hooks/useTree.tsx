import * as React from 'react';
import { ObjectShorthandCollection, ShorthandRenderFunction, TreeItemProps, TreeTitleProps } from '../../../index';
import { flattenTree } from './flattenTree';
import { useGetItemById } from './useGetItemById';
import { useTreeActiveState } from './useTreeActiveState';
import { useTreeBehavior } from './useTreeBehavior';

export interface UseTreeOptions {
  /** Shorthand array of props for Tree. */
  items?: ObjectShorthandCollection<TreeItemProps>;

  /**
   * A custom render function for the title slot.
   *
   * @param Component - The computed component for this slot.
   * @param props - The computed props for this slot.
   * @param children - The computed children for this slot.
   */
  renderItemTitle?: ShorthandRenderFunction<TreeTitleProps>;

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

  // === manage the expand/collapse state of each tree node
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

  // We want to set `expanded` value on all items to simplify rendering later
  // There is no sense to recreate a flat tree so we simply mutating it
  React.useMemo(() => {
    Object.keys(flatTree).forEach(key => {
      if (flatTree[key].expanded) {
        flatTree[key].expanded = false;
      }
    });
    activeItemIds.forEach(activeId => {
      flatTree[activeId].expanded = true;
    });
  }, [activeItemIds, flatTree]);

  // === manage ref to all to-be-rendered tree items  ===
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
    registerItemRef,
    getItemRef,
    toggleItemActive,
    focusParent,
    focusFirstChild,
    siblingsExpand,
  };
}
