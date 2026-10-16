'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { NavItemProps } from './NavItem.types';
import { renderNavItem } from './renderNavItem';
import { useNavItem } from './useNavItem';
import { useNavItemStyles } from './useNavItemStyles.styles';

export const NavItem: ForwardRefComponent<NavItemProps> = React.forwardRef((props, ref) => {
  const state = useNavItem(props, ref);

  useNavItemStyles(state);

  return renderNavItem(state);
}) as ForwardRefComponent<NavItemProps>;

NavItem.displayName = 'NavItem';
