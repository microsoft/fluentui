import { TabListContextValue, TabListContextValues, TabListState } from './TabList.types';

export function useTabListContextValues(state: TabListState): TabListContextValues {
  const { selectedKey, selectTab, vertical } = state;

  const tabList: TabListContextValue = {
    selectedKey,
    selectTab,
    vertical,
  };

  return { tabList };
}
