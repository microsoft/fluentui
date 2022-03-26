import { TabListContextValue, TabListContextValues, TabListState } from './TabList.types';

export function useTabListContextValues(state: TabListState): TabListContextValues {
  const {
    appearance,
    disabled,
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
    disabled,
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
