import * as React from 'react';
import { NavContextValue, NavContextValues, NavState } from '../Nav';

export function useNavContextValues_unstable(state: NavState): NavContextValues {
  const {
    selectedValue,
    onRegister,
    onUnregister,
    onSelect,
    getRegisteredNavItems,
    onRequestNavCategoryItemToggle,
    openItems,
  } = state;

  const navContext = React.useMemo<NavContextValue>(
    () => ({
      selectedValue,
      onSelect,
      onRegister,
      onUnregister,
      getRegisteredNavItems,
      onRequestNavCategoryItemToggle,
      openItems,
    }),
    [
      selectedValue,
      onSelect,
      onRegister,
      onUnregister,
      getRegisteredNavItems,
      onRequestNavCategoryItemToggle,
      openItems,
    ],
  );

  return { nav: navContext };
}
