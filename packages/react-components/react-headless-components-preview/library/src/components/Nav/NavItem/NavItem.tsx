'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavItem } from './useNavItem';
import { renderNavItem } from './renderNavItem';
import type { NavItemProps } from './NavItem.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * NavItem component - a single item in the navigation menu.
 */
export const NavItem: ForwardRefComponent<NavItemProps> = /*#__PURE__*/ composeComponent(
  'NavItem',
  useNavItem,
  renderNavItem,
);
