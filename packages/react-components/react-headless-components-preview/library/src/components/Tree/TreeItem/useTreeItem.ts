'use client';

import type * as React from 'react';
import { useTreeItem_unstable, useTreeItemContextValues_unstable } from '@fluentui/react-tree';

import type { TreeItemContextValues, TreeItemProps, TreeItemState } from './TreeItem.types';
import { toDataAttributeValue } from '../../../utils';

/**
 * Returns the state for a TreeItem component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderTreeItem`.
 */
export const useTreeItem = (props: TreeItemProps, ref: React.Ref<HTMLDivElement>): TreeItemState => {
  const state: TreeItemState = useTreeItem_unstable(props, ref);

  // Set data attributes for the item type, open and checked states to simplify styling of these states.
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-item-type'] = state.itemType;
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-open'] = toDataAttributeValue(state.itemType === 'branch' && state.open);
  // eslint-disable-next-line react-hooks/immutability
  state.root['data-checked'] = toDataAttributeValue(state.checked);

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
