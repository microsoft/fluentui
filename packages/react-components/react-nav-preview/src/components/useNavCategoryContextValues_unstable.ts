import * as React from 'react';
import { NavCategoryState } from '../NavCategory';
import { NavCategoryContextValue, NavCategoryContextValues } from './NavCategoryContext';

export function useNavCategoryContextValues_unstable(state: NavCategoryState): NavCategoryContextValues {
  const { open, value } = state;
  const navCategory = React.useMemo<NavCategoryContextValue>(() => ({ open, value }), [open, value]);

  return { categoryValue: navCategory };
}
