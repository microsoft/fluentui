'use client';

import type * as React from 'react';
import { useTreeBase_unstable, useTreeContextValues_unstable } from '@fluentui/react-tree';

import type { TreeContextValues, TreeProps, TreeState } from './Tree.types';

/**
 * Returns the state for a Tree component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTree`.
 *
 * Arrow key navigation, type ahead and the roving tab index are managed by the root tree.
 */
export const useTree = (props: TreeProps, ref: React.Ref<HTMLElement>): TreeState => {
  const state: TreeState = useTreeBase_unstable(props, ref);

  // Set data attributes for the root tree modes to simplify styling of these states.
  if (state.contextType !== 'subtree') {
    // eslint-disable-next-line react-hooks/immutability
    state.root['data-navigation-mode'] = state.navigationMode ?? 'tree';
    // eslint-disable-next-line react-hooks/immutability
    state.root['data-selection-mode'] = state.selectionMode === 'none' ? undefined : state.selectionMode;
  }

  return state;
};

/**
 * Returns a value from the context of the root tree, such as its open items, checked items or selection mode.
 */
export { useTreeContext_unstable as useTreeContext } from '@fluentui/react-tree';

/**
 * Returns the context of the closest subtree, which exposes its nesting level.
 */
export { useSubtreeContext_unstable as useSubtreeContext } from '@fluentui/react-tree';

/**
 * Maps the state of the tree to the values that are passed through context to its items.
 */
export const useTreeContextValues: (state: TreeState) => TreeContextValues = useTreeContextValues_unstable;
