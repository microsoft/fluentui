'use client';

import type * as React from 'react';
import {
  useTreeContext_unstable,
  useTreeItemContext_unstable,
  useTreeItemLayoutBase_unstable,
} from '@fluentui/react-tree';
import { mergeCallbacks, useEventCallback } from '@fluentui/react-utilities';

import type { TreeItemLayoutProps, TreeItemLayoutState } from './TreeItemLayout.types';

/**
 * Returns the state for a TreeItemLayout component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTreeItemLayout`.
 */
export const useTreeItemLayout = (props: TreeItemLayoutProps, ref: React.Ref<HTMLElement>): TreeItemLayoutState => {
  const state: TreeItemLayoutState = useTreeItemLayoutBase_unstable(props, ref);
  const navigationMode = useTreeContext_unstable(ctx => ctx.navigationMode ?? 'tree');
  const treeItemRef = useTreeItemContext_unstable(ctx => ctx.treeItemRef);

  // Clicking the selector focuses the native input, which does not handle tree navigation,
  // so focus is moved back to the tree item unless the consumer prevented the click.
  const focusTreeItem = useEventCallback((event: React.MouseEvent<HTMLInputElement>) => {
    if (!event.defaultPrevented) {
      treeItemRef?.current?.focus();
    }
  });

  if (state.selector) {
    // eslint-disable-next-line react-hooks/immutability
    state.selector.onClick = mergeCallbacks(state.selector.onClick, focusTreeItem);
  }

  if (state.actions) {
    // Arrow keys move between the actions, wrapping around unless the tree is a treegrid, where ArrowLeft
    // moves focus back to the tree item from the last action it reaches: the first one, or the last one in RTL.
    // eslint-disable-next-line react-hooks/immutability
    state.actions.focusgroup = `toolbar inline${navigationMode === 'tree' ? ' wrap' : ''}`;
  }

  return state;
};
