/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TreeItemLayoutState, TreeItemLayoutInternalSlots } from './TreeItemLayout.types';
import { ButtonContextProvider } from '@fluentui/react-button';

/**
 * Render the final JSX of TreeItemLayout
 */
export const renderTreeItemLayout_unstable = (state: TreeItemLayoutState) => {
  const { slots, slotProps } = getSlotsNext<TreeItemLayoutInternalSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
      {slots.iconBefore && <slots.iconBefore {...slotProps.iconBefore} />}
      <slots.content {...slotProps.content}>{slotProps.root.children}</slots.content>
      {slots.iconAfter && <slots.iconAfter {...slotProps.iconAfter} />}
      <ButtonContextProvider value={state.buttonContextValue}>
        {slots.actions && <slots.actions {...slotProps.actions} />}
        {slots.aside && <slots.aside {...slotProps.aside} />}
      </ButtonContextProvider>
    </slots.root>
  );
};
