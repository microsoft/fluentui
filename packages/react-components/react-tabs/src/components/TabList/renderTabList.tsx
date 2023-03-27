import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TabListState, TabListSlots, TabListContextValues } from './TabList.types';
import { TabListProvider } from './TabListContext';

/**
 * Render the final JSX of TabList
 */
export const renderTabList_unstable = (state: TabListState, contextValues: TabListContextValues) => {
  const { slots, slotProps } = getSlots<TabListSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <TabListProvider value={contextValues.tabList}>{state.root.children}</TabListProvider>
    </slots.root>
  );
};
