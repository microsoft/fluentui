'use client';

import type * as React from 'react';
import { ArrowLeft } from '@fluentui/keyboard-keys';
import { useTreeContext_unstable, useTreeItem_unstable, useTreeItemContextValues_unstable } from '@fluentui/react-tree';
import { useEventCallback } from '@fluentui/react-utilities';

import type { TreeItemContextValues, TreeItemProps, TreeItemState } from './TreeItem.types';
import { toDataAttributeValue } from '../../../utils';

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]',
].join(',');

/**
 * Returns whether the event target is within an action that is preceded by another focusable action.
 */
const isAfterFirstAction = (actions: HTMLElement, target: Node): boolean => {
  const focusableActions = Array.from(actions.querySelectorAll<HTMLElement>(focusableSelector));
  return focusableActions.findIndex(action => action.contains(target)) > 0;
};

/**
 * Returns the state for a TreeItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTreeItem`.
 */
export const useTreeItem = (props: TreeItemProps, ref: React.Ref<HTMLDivElement>): TreeItemState => {
  const state: TreeItemState = useTreeItem_unstable(props, ref);
  const navigationMode = useTreeContext_unstable(ctx => ctx.navigationMode ?? 'tree');

  // Set data attributes for the item type, open and checked states to simplify styling of these states.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-item-type'] = state.itemType;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-open'] = toDataAttributeValue(state.itemType === 'branch' && state.open);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-checked'] = toDataAttributeValue(state.checked);

  // In a treegrid, ArrowLeft moves focus from the actions back to the tree item only from the first action,
  // otherwise the actions focusgroup moves focus to the preceding action.
  const { onKeyDown: handleTreeItemKeyDown } = state.root;
  // eslint-disable-next-line react-hooks/immutability
  state.root.onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    const { actionsRef } = state;
    const actions = actionsRef && 'current' in actionsRef ? actionsRef.current : null;
    if (
      navigationMode === 'treegrid' &&
      event.key === ArrowLeft &&
      !event.altKey &&
      actions &&
      isAfterFirstAction(actions, event.target as Node)
    ) {
      props.onKeyDown?.(event);
      return;
    }
    handleTreeItemKeyDown?.(event);
  });

  return state;
};

/**
 * Returns a value from the context of the closest tree item, such as its value, open or checked state.
 */
export { useTreeItemContext_unstable as useTreeItemContext } from '@fluentui/react-tree';

/**
 * Maps the state of the tree item to the values that are passed through context to its layout and subtree.
 */
export const useTreeItemContextValues: (state: TreeItemState) => TreeItemContextValues =
  useTreeItemContextValues_unstable;
