import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TreeItemState, TreeItemSlots } from './TreeItem.types';

/**
 * Render the final JSX of TreeItem
 */
export const renderTreeItem_unstable = (state: TreeItemState) => {
  const { slots, slotProps } = getSlots<TreeItemSlots>(state);

  return <slots.root {...slotProps.root} />;
};
