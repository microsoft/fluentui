/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { TabListState, TabListSlots, TabListContextValues } from './TabList.types';
import { TabListProvider } from './TabListContext';

/**
 * Render the final JSX of TabList
 */
export const renderTabList_unstable = (state: TabListState, contextValues: TabListContextValues) => {
  assertSlots<TabListSlots>(state);

  return (
    <state.root>
      <TabListProvider value={contextValues.tabList}>{state.root.children}</TabListProvider>
    </state.root>
  );
};
