'use client';

import * as React from 'react';
import { ArrowLeft, ArrowRight, Enter, Space } from '@fluentui/keyboard-keys';
import {
  useTreeContext_unstable,
  useTreeItem_unstable,
  useTreeItemContext_unstable,
  useTreeItemContextValues_unstable,
} from '@fluentui/react-tree';
import { useEventCallback, useTimeout } from '@fluentui/react-utilities';

import type { TreeItemContextValues, TreeItemProps, TreeItemState } from './TreeItem.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a TreeItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTreeItem`.
 */
export const useTreeItem = (props: TreeItemProps, ref: React.Ref<HTMLDivElement>): TreeItemState => {
  const itemDisabled = useTreeItemContext(context => context.disabled ?? false);
  const { disabled: disabledProp = false, ...baseProps } = props;
  const disabled = itemDisabled || disabledProp;
  const state: TreeItemState = { ...useTreeItem_unstable(baseProps, ref), disabled };
  const navigationMode = useTreeContext_unstable(ctx => ctx.navigationMode ?? 'tree');
  const requestTreeResponse = useTreeContext_unstable(ctx => ctx.requestTreeResponse);
  const parentValue = useTreeItemContext_unstable(ctx => props.parentValue ?? ctx.value);
  const [setActionsNavigationTimeout] = useTimeout();

  state.root['data-disabled'] = toDataAttributeValue(disabled);
  state.root['aria-disabled'] = disabled || undefined;

  const { onClick: handleClick, onChange: handleChange } = state.root;
  state.root.onClick = useEventCallback(event => {
    if (disabled) {
      return;
    }
    handleClick?.(event);
  });
  state.root.onChange = useEventCallback(event => {
    if (disabled) {
      return;
    }
    handleChange?.(event);
  });

  // Set data attributes for the item type, open and checked states to simplify styling of these states.
  state.root['data-item-type'] = state.itemType;
  state.root['data-open'] = toDataAttributeValue(state.itemType === 'branch' && state.open);
  state.root['data-checked'] = toDataAttributeValue(state.checked);

  // In a treegrid, ArrowLeft on an action first lets the actions focusgroup move focus to the preceding action,
  // in the reading direction. Focus only returns to the tree item when the focusgroup did not move it.
  const { onKeyDown: handleTreeItemKeyDown } = state.root;
  // eslint-disable-next-line react-hooks/immutability
  state.root.onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      disabled &&
      event.target === event.currentTarget &&
      (event.key === Enter || event.key === Space || event.key === ArrowLeft || event.key === ArrowRight)
    ) {
      props.onKeyDown?.(event);
      if (event.isDefaultPrevented() || (event.altKey && (event.key === ArrowLeft || event.key === ArrowRight))) {
        return;
      }
      if (event.key === Enter || event.key === Space) {
        event.preventDefault();
        return;
      }
      if (event.key === ArrowLeft || event.key === ArrowRight) {
        // Disabled items can still be explored, but must never expand or collapse.
        if (event.key === ArrowLeft || state.open || state.itemType === 'leaf' || navigationMode === 'treegrid') {
          requestTreeResponse({
            requestType: 'navigate',
            event,
            value: state.value,
            itemType: state.itemType,
            parentValue,
            type: event.key,
            target: event.currentTarget,
          });
        }
        return;
      }
    }
    const { actionsRef } = state;
    const actions = actionsRef && 'current' in actionsRef ? actionsRef.current : null;
    if (
      navigationMode !== 'treegrid' ||
      event.key !== ArrowLeft ||
      event.altKey ||
      !actions?.contains(event.target as Node)
    ) {
      handleTreeItemKeyDown?.(event);
      return;
    }

    props.onKeyDown?.(event);
    if (event.isDefaultPrevented()) {
      return;
    }
    const target = event.currentTarget;
    // The document or the shadow root containing the tree, whose active element is the focused action
    const root = (event.target as Node).getRootNode() as Document | ShadowRoot;
    const { activeElement } = root;
    // The focusgroup moves focus as the default action of the event, after it is dispatched
    setActionsNavigationTimeout(() => {
      if (root.activeElement !== activeElement || !actions.contains(activeElement)) {
        return;
      }
      if (root !== target.ownerDocument) {
        // Tree navigation only sees the shadow host as the active element of the document,
        // so focus is returned to the tree item directly.
        target.focus();
        return;
      }
      requestTreeResponse({
        requestType: 'navigate',
        event,
        value: state.value,
        itemType: state.itemType,
        parentValue,
        type: ArrowLeft,
        target,
      });
    }, 0);
  });

  return state;
};

/**
 * Returns a value from the context of the closest tree item, such as its value, open or checked state.
 * The default context outside an item provider has no disabled field.
 */
export const useTreeItemContext = useTreeItemContext_unstable as <T>(
  selector: (context: TreeItemContextValues['treeItem']) => T,
) => T;

/**
 * Maps the state of the tree item to the values that are passed through context to its layout and subtree.
 */
export const useTreeItemContextValues = (state: TreeItemState): TreeItemContextValues => {
  const { treeItem } = useTreeItemContextValues_unstable(state);
  const { disabled } = state;
  return React.useMemo(() => ({ treeItem: { ...treeItem, disabled } }), [treeItem, disabled]);
};
