import { TabListContextValue, TabListContextValues, TabListState } from './TabList.types';

export function useTabListContextValues(state: TabListState): TabListContextValues {
  const { appearance, selectedValue: selectedKey, selectTab, size, vertical, verticalTabContent } = state;

  const tabList: TabListContextValue = {
    appearance,
    selectedValue: selectedKey,
    selectTab,
    size,
    vertical,
    verticalTabContent,
  };

  return { tabList };
}
