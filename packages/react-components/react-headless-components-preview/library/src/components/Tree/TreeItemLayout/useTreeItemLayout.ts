'use client';

import type * as React from 'react';
import { useTreeContext_unstable, useTreeItemLayoutBase_unstable } from '@fluentui/react-tree';

import type { TreeItemLayoutProps, TreeItemLayoutState } from './TreeItemLayout.types';

/**
 * Returns the state for a TreeItemLayout component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTreeItemLayout`.
 */
export const useTreeItemLayout = (props: TreeItemLayoutProps, ref: React.Ref<HTMLElement>): TreeItemLayoutState => {
  const state: TreeItemLayoutState = useTreeItemLayoutBase_unstable(props, ref);
  const navigationMode = useTreeContext_unstable(ctx => ctx.navigationMode ?? 'tree');

  if (state.actions) {
    // Arrow keys move between the actions, wrapping around unless the tree is a treegrid,
    // where ArrowLeft on the first action moves focus back to the tree item.
    // eslint-disable-next-line react-hooks/immutability
    state.actions.focusgroup = `toolbar inline${navigationMode === 'tree' ? ' wrap' : ''}`;
  }

  return state;
};
