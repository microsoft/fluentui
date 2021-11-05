import { TabListContextValue, TabListContextValues, TabListState } from './TabList.types';

export function useTabListContextValues(state: TabListState): TabListContextValues {
  const { selectedKey, selectTab } = state;

  const tabList: TabListContextValue = {
    selectedKey,
    selectTab,
  };

  return { tabList };
}
