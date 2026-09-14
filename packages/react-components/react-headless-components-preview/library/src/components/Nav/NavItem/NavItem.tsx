'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavItem } from './useNavItem';
import { renderNavItem } from './renderNavItem';
import type { NavItemProps } from './NavItem.types';

/**
 * NavItem component - a single item in the navigation menu.
 */
export const NavItem: ForwardRefComponent<NavItemProps> = React.forwardRef((props, ref) => {
  const state = useNavItem(props, ref);
  return renderNavItem(state);
});

NavItem.displayName = 'NavItem';
