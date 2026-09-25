'use client';

import * as React from 'react';
import { useNav as useNavBase, useNavContext } from '@fluentui/react-headless-components-preview/nav';
import type { NavContextValue, NavContextValues, NavProps, NavState } from './Nav.types';

export { useNavContext };

type NavContextState = Pick<
  NavState,
  | 'density'
  | 'getRegisteredNavItems'
  | 'multiple'
  | 'onNavItemSelect'
  | 'onRegister'
  | 'onRequestNavCategoryItemToggle'
  | 'onSelect'
  | 'onUnregister'
  | 'openCategories'
  | 'selectedCategoryValue'
  | 'selectedValue'
  | 'tabbable'
>;

export const useNav = (props: NavProps, ref: React.Ref<HTMLDivElement>): NavState => {
  const { density = 'medium', ...rest } = props;
  const state = useNavBase(rest, ref);

  return {
    ...state,
    density,
    tabbable: false,
    root: {
      ...state.root,
      'data-density': density,
    },
  };
};

export function useNavContextValues(state: NavContextState): NavContextValues {
  const {
    density,
    getRegisteredNavItems,
    multiple,
    onNavItemSelect,
    onRegister,
    onRequestNavCategoryItemToggle,
    onSelect,
    onUnregister,
    openCategories,
    selectedCategoryValue,
    selectedValue,
    tabbable,
  } = state;

  const nav = React.useMemo<NavContextValue>(
    () => ({
      density,
      getRegisteredNavItems,
      multiple,
      onNavItemSelect,
      onRegister,
      onRequestNavCategoryItemToggle,
      onSelect,
      onUnregister,
      openCategories,
      selectedCategoryValue,
      selectedValue,
      tabbable,
    }),
    [
      density,
      getRegisteredNavItems,
      multiple,
      onNavItemSelect,
      onRegister,
      onRequestNavCategoryItemToggle,
      onSelect,
      onUnregister,
      openCategories,
      selectedCategoryValue,
      selectedValue,
      tabbable,
    ],
  );

  return { nav };
}
