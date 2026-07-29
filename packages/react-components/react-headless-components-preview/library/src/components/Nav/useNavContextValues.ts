'use client';

import * as React from 'react';
import type { NavContextValue, NavContextValues } from './navContext';
import type { NavState } from './Nav.types';

export function useNavContextValues(state: NavState): NavContextValues {
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
    onNavItemSelect,
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
      onNavItemSelect,
      density: 'medium',
      tabbable: false,
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
      onNavItemSelect,
    ],
  );

  return { nav: navContext };
}
