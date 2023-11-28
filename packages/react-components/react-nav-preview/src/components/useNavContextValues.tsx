import { NavContextValue, NavContextValues, NavState } from '../Nav';

export function useNavContextValues_unstable(state: NavState): NavContextValues {
  const { selectedValue: selectedKey, onRegister, onUnregister, onSelect, getRegisteredNavGroups } = state;

  const navContext: NavContextValue = {
    selectedValue: selectedKey,
    onSelect,
    onRegister,
    onUnregister,
    getRegisteredNavGroups,
  };

  return { nav: navContext };
}
