import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { BaseTreeItemState, BaseTreeItemSlots } from './BaseTreeItem.types';

/**
 * Render the final JSX of BaseTreeItem
 */
export const renderBaseTreeItem_unstable = (state: BaseTreeItemState) => {
  const { slots, slotProps } = getSlots<BaseTreeItemSlots>(state);

  return <slots.root {...slotProps.root} />;
};
