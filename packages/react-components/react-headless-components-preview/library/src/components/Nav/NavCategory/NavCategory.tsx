'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavCategoryProps } from './NavCategory.types';
import { useNavCategory } from './useNavCategory';
import { renderNavCategory } from './renderNavCategory';
import { useNavCategoryContextValues } from './useNavCategoryContextValues';

/**
 * NavCategory component - a category in the navigation menu that can contain multiple items.
 */
export const NavCategory: ForwardRefComponent<NavCategoryProps> = React.forwardRef((props, ref) => {
  const state = useNavCategory(props, ref);
  const contextValues = useNavCategoryContextValues(state);

  return renderNavCategory(state, contextValues);
});

NavCategory.displayName = 'NavCategory';
