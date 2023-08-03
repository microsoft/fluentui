/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TreeItemLayoutState, TreeItemLayoutSlots } from './TreeItemLayout.types';
import { ButtonContextProvider } from '@fluentui/react-button';

/**
 * Render the final JSX of TreeItemLayout
 */
export const renderTreeItemLayout_unstable = (state: TreeItemLayoutState) => {
  const { slots, slotProps } = getSlotsNext<TreeItemLayoutSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
      {slots.selector && <slots.selector {...slotProps.selector} />}
      {slots.iconBefore && <slots.iconBefore {...slotProps.iconBefore} />}
      <slots.main {...slotProps.main}>{slotProps.root.children}</slots.main>
      {slots.iconAfter && <slots.iconAfter {...slotProps.iconAfter} />}
      <ButtonContextProvider value={state.buttonContextValue}>
        {slots.actions && <slots.actions {...slotProps.actions} />}
        {slots.aside && <slots.aside {...slotProps.aside} />}
      </ButtonContextProvider>
    </slots.root>
  );
};
