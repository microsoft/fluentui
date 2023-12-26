import * as React from 'react';
import { NavContextValue, NavContextValues, NavState } from '../Nav';

export function useNavContextValues_unstable(state: NavState): NavContextValues {
  const { selectedValue, onRegister, onUnregister, onSelect, getRegisteredNavGroups } = state;

  const navContext = React.useMemo<NavContextValue>(
    () => ({
      selectedValue,
      onSelect,
      onRegister,
      onUnregister,
      getRegisteredNavGroups,
    }),
    [selectedValue, onSelect, onRegister, onUnregister, getRegisteredNavGroups],
  );

  return { nav: navContext };
}
