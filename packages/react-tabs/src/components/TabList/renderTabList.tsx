import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TabListState, TabListSlots, TabListContextValues } from './TabList.types';
import { TabListContext } from './TabListContext';

/**
 * Render the final JSX of TabList
 */
export const renderTabList_unstable = (state: TabListState, contextValues: TabListContextValues) => {
  const { slots, slotProps } = getSlots<TabListSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <TabListContext.Provider value={contextValues.tabList}>{state.root.children}</TabListContext.Provider>
    </slots.root>
  );
};
