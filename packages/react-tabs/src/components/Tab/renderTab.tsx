import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TabState, TabSlots } from './Tab.types';

/**
 * Render the final JSX of Tab
 */
export const renderTab_unstable = (state: TabState) => {
  const { slots, slotProps } = getSlots<TabSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.icon && <slots.icon {...slotProps.icon} />}
      {!state.iconOnly && <slots.content {...slotProps.content} />}
    </slots.root>
  );
};
