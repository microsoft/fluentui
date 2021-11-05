import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { tabListShorthandProps } from './useTabList';
import type { TabListState, TabListSlots } from './TabList.types';

/**
 * Render the final JSX of TabList
 */
export const renderTabList = (state: TabListState) => {
  const { slots, slotProps } = getSlots<TabListSlots>(state, tabListShorthandProps);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
