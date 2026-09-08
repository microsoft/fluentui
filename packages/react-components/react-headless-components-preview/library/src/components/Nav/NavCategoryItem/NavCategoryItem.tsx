'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavCategoryItem } from './useNavCategoryItem';
import { renderNavCategoryItem } from './renderNavCategoryItem';
import { useNavCategoryItemContextValues } from './useNavCategoryItemContextValues';
import type { NavCategoryItemProps } from './NavCategoryItem.types';

/**
 * NavCategoryItem - a clickable header that expands a list of NavSubItems.
 */
export const NavCategoryItem: ForwardRefComponent<NavCategoryItemProps> = React.forwardRef((props, ref) => {
  const state = useNavCategoryItem(props, ref);
  const contextValues = useNavCategoryItemContextValues(state);

  return renderNavCategoryItem(state, contextValues);
});

NavCategoryItem.displayName = 'NavCategoryItem';
