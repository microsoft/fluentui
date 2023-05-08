/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TreeItemLayoutState, TreeItemLayoutSlots } from './TreeItemLayout.types';

/**
 * Render the final JSX of TreeItemLayout
 */
export const renderTreeItemLayout_unstable = (state: TreeItemLayoutState) => {
  const { isActionsVisible } = state;
  const { slots, slotProps } = getSlotsNext<TreeItemLayoutSlots>(state);
  return (
    <slots.root {...slotProps.root}>
      {slots.iconBefore && <slots.iconBefore {...slotProps.iconBefore} />}
      {slotProps.root.children}
      {slots.iconAfter && <slots.iconAfter {...slotProps.iconAfter} />}
      {!isActionsVisible && slots.aside && <slots.aside {...slotProps.aside} />}
    </slots.root>
  );
};
