import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TreeItemState, TreeItemSlots } from './TreeItem.types';

/**
 * Render the final JSX of TreeItem
 */
export const renderTreeItem_unstable = (state: TreeItemState) => {
  const { slots, slotProps } = getSlots<TreeItemSlots>(state);

  return (
    <slots.groupper {...slotProps.groupper}>
      <slots.root {...slotProps.root}>
        {slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
        {slots.iconBefore && <slots.iconBefore {...slotProps.iconBefore} />}
        {slotProps.root.children}
        {slots.iconAfter && <slots.iconAfter {...slotProps.iconAfter} />}
        {slots.badges && <slots.badges {...slotProps.badges} />}
        {slots.actions && <slots.actions {...slotProps.actions} />}
      </slots.root>
    </slots.groupper>
  );
};
