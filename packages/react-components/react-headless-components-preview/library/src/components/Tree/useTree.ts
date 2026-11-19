'use client';

import * as React from 'react';
import {
  useTreeBase_unstable,
  useTreeContext_unstable,
  useSubtreeContext_unstable,
  useTreeContextValues_unstable,
} from '@fluentui/react-tree';

import type { SubtreeContextValue, TreeContextValue, TreeContextValues, TreeProps, TreeState } from './Tree.types';
import { SubtreeDisabledContext, TreeDisabledContext, TreeItemDisabledContext } from './treeDisabledContext';
import { toDataAttributeValue } from '../../utils';

/**
 * Returns the state for a Tree component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTree`.
 *
 * Arrow key navigation, type ahead and the roving tab index are managed by the root tree.
 */
export const useTree = (props: TreeProps, ref: React.Ref<HTMLElement>): TreeState => {
  const treeDisabled = React.useContext(TreeDisabledContext);
  const itemDisabled = React.useContext(TreeItemDisabledContext);
  const { disabled: disabledProp = false, ...baseProps } = props;
  const disabled =
    treeDisabled ||
    itemDisabled ||
    disabledProp ||
    props['aria-disabled'] === true ||
    props['aria-disabled'] === 'true';
  const state: TreeState = { ...useTreeBase_unstable(baseProps, ref), disabled };

  state.root['data-disabled'] = toDataAttributeValue(disabled);
  state.root['aria-disabled'] = disabled || props['aria-disabled'];

  // Set data attributes for the root tree modes to simplify styling of these states.
  if (state.contextType !== 'subtree') {
    state.root['data-navigation-mode'] = state.navigationMode ?? 'tree';
    state.root['data-selection-mode'] = state.selectionMode === 'none' ? undefined : state.selectionMode;
  }

  return state;
};

/**
 * Returns a value from the context of the root tree, such as its open items, checked items or selection mode.
 */
export const useTreeContext = <T>(selector: (context: TreeContextValue) => T): T => {
  const disabled = React.useContext(TreeDisabledContext) ?? false;
  return useTreeContext_unstable(context => selector({ ...context, disabled }));
};

/**
 * Returns the context of the closest subtree, which exposes its nesting level.
 */
export const useSubtreeContext = (): SubtreeContextValue => {
  const disabled = React.useContext(SubtreeDisabledContext) ?? false;
  return { ...useSubtreeContext_unstable(), disabled };
};

/**
 * Maps the state of the tree to the values that are passed through context to its items.
 */
export const useTreeContextValues = (state: TreeState): TreeContextValues => {
  const { tree } = useTreeContextValues_unstable(state);
  return { tree: { ...tree, disabled: state.disabled } };
};
