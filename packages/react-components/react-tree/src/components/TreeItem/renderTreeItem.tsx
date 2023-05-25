/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TreeItemState, TreeItemSlots, TreeItemContextValues } from './TreeItem.types';
import { TreeItemProvider } from '../../contexts';

/**
 * Render the final JSX of TreeItem
 */
export const renderTreeItem_unstable = (state: TreeItemState, contextValues: TreeItemContextValues) => {
  const { slots, slotProps } = getSlotsNext<TreeItemSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <TreeItemProvider value={contextValues.treeItem}>{slotProps.root.children}</TreeItemProvider>
    </slots.root>
  );
};
