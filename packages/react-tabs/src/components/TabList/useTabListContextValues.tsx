import { TabListContextValue, TabListContextValues, TabListState } from './TabList.types';

export function useTabListContextValues(state: TabListState): TabListContextValues {
  const {
    appearance,
    selectedValue: selectedKey,
    onRegister,
    onUnregister,
    onSelect,
    previousSelectedValue,
    registeredTabs,
    size,
    vertical,
  } = state;

  const tabList: TabListContextValue = {
    appearance,
    selectedValue: selectedKey,
    onSelect,
    onRegister,
    onUnregister,
    previousSelectedValue,
    registeredTabs,
    size,
    vertical,
  };

  return { tabList };
}
