import * as React from 'react';
import { TreeProps } from '../Tree';
import { flattenTree, getTobeRenderedItemsProps } from './flattenTree';
import { useTreeActiveState } from './useTreeActiveState';
import { useTreeBehavior } from './useTreeBehavior';

export function useTree(props: TreeProps) {
  // build flattened tree from props.items
  const flatTreeFromProps = React.useMemo(() => flattenTree(props.items), [props.items]);

  // useTreeActiveState hook updates flattened tree with the expand/collapse state of each tree node
  const { activeItemIds, flatTree, toggleActive } = useTreeActiveState(props, flatTreeFromProps);

  // use flattened tree to generate props for the to-be-rendered tree items ===
  const tobeRenderedItemsProps = React.useMemo(
    () => getTobeRenderedItemsProps(props.items, flatTree, props.renderItemTitle),
    [props.items, props.renderItemTitle, flatTree],
  );

  // === manage ref to all to-be-rendered tree items  ===
  const nodes = React.useRef({});
  const registerItemRef = React.useCallback((id, node) => {
    nodes.current[id] = node;
  }, []);
  const getItemRef = React.useCallback(id => nodes.current[id], []);

  // === context provided by tree, consumed by tree items ===
  const { focusParent, focusFirstChild, siblingsExpand } = useTreeBehavior(
    flatTree,
    toggleActive,
    props.exclusive,
    getItemRef,
  );

  const getItemById = React.useCallback(id => flatTree[id], [flatTree]);

  return {
    activeItemIds,
    flatTree,
    tobeRenderedItemsProps,
    toggleActive,
    focusParent,
    focusFirstChild,
    siblingsExpand,
    registerItemRef,
    getItemRef,
    getItemById,
  };
}
