import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { tabShorthandProps } from './useTab';
import type { TabState, TabSlots } from './Tab.types';

/**
 * Render the final JSX of Tab
 */
export const renderTab = (state: TabState) => {
  const { slots, slotProps } = getSlots<TabSlots>(state, tabShorthandProps);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
