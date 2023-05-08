/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TreeItemState, TreeItemSlots, TreeItemContextValues } from './TreeItem.types';
import { TreeItemProvider } from '../../contexts';
import { ButtonContextProvider } from '@fluentui/react-button';

/**
 * Render the final JSX of TreeItem
 */
export const renderTreeItem_unstable = (state: TreeItemState, contextValues: TreeItemContextValues) => {
  const { slots, slotProps } = getSlotsNext<TreeItemSlots>(state);

  return (
    <TreeItemProvider value={contextValues.treeItem}>
      <slots.root {...slotProps.root}>
        <slots.content {...slotProps.content}>
          {slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
          {slotProps.content.children}
          <ButtonContextProvider value={contextValues.button}>
            {slots.actions && <slots.actions {...slotProps.actions} />}
          </ButtonContextProvider>
        </slots.content>
        {state.open && slots.subtree && <slots.subtree {...slotProps.subtree} />}
      </slots.root>
    </TreeItemProvider>
  );
};
