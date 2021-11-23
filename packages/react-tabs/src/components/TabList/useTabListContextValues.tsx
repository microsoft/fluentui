import { TabListContextValue, TabListContextValues, TabListState } from './TabList.types';

export function useTabListContextValues(state: TabListState): TabListContextValues {
  const { appearance, selectedValue: selectedKey, onSelect: onSelect, size, vertical, verticalTabContent } = state;

  const tabList: TabListContextValue = {
    appearance,
    selectedValue: selectedKey,
    onSelect,
    size,
    vertical,
    verticalTabContent,
  };

  return { tabList };
}
