import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TreeItemState, TreeItemSlots, TreeItemContextValues } from './TreeItem.types';
import { TreeItemProvider } from '../../contexts/treeItemContext';

/**
 * Render the final JSX of TreeItem
 */
export const renderTreeItem_unstable = (state: TreeItemState, contextValues: TreeItemContextValues) => {
  const { slots, slotProps } = getSlots<TreeItemSlots>(state);

  return (
    <TreeItemProvider value={contextValues.treeItem}>
      <slots.groupper {...slotProps.groupper}>
        <slots.root {...slotProps.root}>
          {slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
          {slotProps.root.children}
          {slots.actions && <slots.actions {...slotProps.actions} />}
        </slots.root>
      </slots.groupper>
    </TreeItemProvider>
  );
};
