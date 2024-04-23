import * as React from 'react';
import { NavCategoryItemContextValue } from './NavCategoryItemContext';
import { NavCategoryItemContextValues, NavCategoryItemState } from './NavCategoryItem/NavCategoryItem.types';

export function useNavCategoryItemContextValues_unstable(state: NavCategoryItemState): NavCategoryItemContextValues {
  const { open, value } = state;
  const navCategoryItem = React.useMemo<NavCategoryItemContextValue>(() => ({ open, value }), [open, value]);

  return { navCategoryItem };
}
