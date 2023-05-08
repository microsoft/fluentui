import { TabListContextValue, TabListContextValues, TabListState } from './TabList.types';

export function useTabListContextValues_unstable(state: TabListState): TabListContextValues {
  const {
    appearance,
    reserveSelectedTabSpace,
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
    reserveSelectedTabSpace,
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
