import { TabListContextValue, TabListContextValues, TabListState } from './TabList.types';

export function useTabListContextValues(state: TabListState): TabListContextValues {
  const {
    appearance,
    disabled,
    selectedValue: selectedKey,
    onRegister,
    onUnregister,
    onSelect,
    getRegisteredTabs,
    size,
    vertical,
  } = state;

  const tabList: TabListContextValue = {
    appearance,
    disabled,
    selectedValue: selectedKey,
    onSelect,
    onRegister,
    onUnregister,
    getRegisteredTabs,
    size,
    vertical,
  };

  return { tabList };
}
