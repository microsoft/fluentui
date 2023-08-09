/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TabListState, TabListSlots, TabListContextValues } from './TabList.types';
import { TabListProvider } from './TabListContext';

/**
 * Render the final JSX of TabList
 */
export const renderTabList_unstable = (state: TabListState, contextValues: TabListContextValues) => {
  const { slots, slotProps } = getSlotsNext<TabListSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <TabListProvider value={contextValues.tabList}>{state.root.children}</TabListProvider>
    </slots.root>
  );
};
