'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavCategoryItem } from './useNavCategoryItem';
import { renderNavCategoryItem } from './renderNavCategoryItem';
import { useNavCategoryItemContextValues } from './useNavCategoryItemContextValues';
import type { NavCategoryItemProps } from './NavCategoryItem.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * NavCategoryItem - a clickable header that expands a list of NavSubItems.
 */
export const NavCategoryItem: ForwardRefComponent<NavCategoryItemProps> = /*#__PURE__*/ composeComponent(
  'NavCategoryItem',
  useNavCategoryItem,
  renderNavCategoryItem,
  useNavCategoryItemContextValues,
);
