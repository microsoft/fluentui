/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TreeItemState, TreeItemContextValues, TreeItemInternalSlot } from './TreeItem.types';
import { TreeItemProvider, TreeItemSlotsProvider } from '../../contexts';

/**
 * Render the final JSX of TreeItem
 */
export const renderTreeItem_unstable = (state: TreeItemState, contextValues: TreeItemContextValues) => {
  const { slots, slotProps } = getSlotsNext<TreeItemInternalSlot>(state);

  return (
    <slots.root {...slotProps.root}>
      <TreeItemProvider value={contextValues.treeItem}>
        <TreeItemSlotsProvider value={contextValues.treeItemSlots}>{slotProps.root.children}</TreeItemSlotsProvider>
      </TreeItemProvider>
    </slots.root>
  );
};
