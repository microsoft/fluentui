'use client';

import * as React from 'react';
import type { NavContextValue, NavContextValues } from './navContext';
import type { NavState } from './Nav.types';

/**
 * The part of the nav state mapped to the context values. Shared by `NavState` and `NavDrawerState`.
 */
export type NavContextValuesState = Pick<
  NavState,
  | 'selectedValue'
  | 'selectedCategoryValue'
  | 'onRegister'
  | 'onUnregister'
  | 'onSelect'
  | 'getRegisteredNavItems'
  | 'onRequestNavCategoryItemToggle'
  | 'openCategories'
  | 'multiple'
  | 'onNavItemSelect'
>;

export function useNavContextValues(state: NavContextValuesState): NavContextValues {
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
