import * as React from 'react';
import { NavContextValue, NavContextValues, NavState } from '../Nav';

export function useNavContextValues_unstable(state: NavState): NavContextValues {
  const {
    selectedValue,
    selectedCategoryValue,
    onRegister,
    onUnregister,
    onSelect,
    getRegisteredNavItems,
    onRequestNavCategoryItemToggle,
    openCategories,
    multiple,
    density,
  } = state;

  const navContext = React.useMemo<NavContextValue>(
    () => ({
      selectedValue,
      selectedCategoryValue,
      onSelect,
      onRegister,
      onUnregister,
      getRegisteredNavItems,
      onRequestNavCategoryItemToggle,
      openCategories,
      multiple,
      density,
    }),
    [
      selectedValue,
      selectedCategoryValue,
      onSelect,
      onRegister,
      onUnregister,
      getRegisteredNavItems,
      onRequestNavCategoryItemToggle,
      openCategories,
      multiple,
      density,
    ],
  );

  return { nav: navContext };
}
