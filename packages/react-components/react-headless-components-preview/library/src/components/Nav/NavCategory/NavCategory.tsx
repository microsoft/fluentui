'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavCategoryProps } from './NavCategory.types';
import { useNavCategory } from './useNavCategory';
import { renderNavCategory } from './renderNavCategory';
import { useNavCategoryContextValues } from './useNavCategoryContextValues';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * NavCategory component - a category in the navigation menu that can contain multiple items.
 */
export const NavCategory: ForwardRefComponent<NavCategoryProps> = /*#__PURE__*/ composeComponent(
  'NavCategory',
  useNavCategory,
  renderNavCategory,
  useNavCategoryContextValues,
);
