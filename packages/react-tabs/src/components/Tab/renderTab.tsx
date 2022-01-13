import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TabState, TabSlots } from './Tab.types';

/**
 * Render the final JSX of Tab
 */
export const renderTab = (state: TabState) => {
  const { slots, slotProps } = getSlots<TabSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.icon {...slotProps.icon} />
      <slots.content {...slotProps.content} />
    </slots.root>
  );
};
