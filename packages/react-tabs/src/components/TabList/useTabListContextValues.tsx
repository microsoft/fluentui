import { TabListContextValue, TabListContextValues, TabListState } from './TabList.types';

export function useTabListContextValues(state: TabListState): TabListContextValues {
  const { selectedKey, selectTab, vertical, verticalTabContent } = state;

  const tabList: TabListContextValue = {
    selectedKey,
    selectTab,
    vertical,
    verticalTabContent,
  };

  return { tabList };
}
