'use client';

import * as React from 'react';
import type {
  NavCategoryItemContextValue,
  NavCategoryItemContextValues,
  NavCategoryItemState,
} from './NavCategoryItem.types';

/**
 * Self-contained context values hook for headless NavCategoryItem.
 */
export function useNavCategoryItemContextValues(state: NavCategoryItemState): NavCategoryItemContextValues {
  const { open, value } = state;
  const navCategoryItem = React.useMemo<NavCategoryItemContextValue>(() => ({ open, value }), [open, value]);

  return { navCategoryItem };
}
