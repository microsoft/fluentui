import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

import { useNavItem_unstable } from './useNavItem';
import { renderNavItem_unstable } from './renderNavItem';
import { useNavItemStyles_unstable } from './useNavItemStyles.styles';
import type { NavItemProps } from './NavItem.types';

/**
 * NavItem component - a single item in the navigation menu.
 */
export const NavItem: ForwardRefComponent<NavItemProps> = React.forwardRef((props, ref) => {
  const state = useNavItem_unstable(props, ref);

  useNavItemStyles_unstable(state);
  useCustomStyleHook_unstable('useNavItemStyles_unstable')(state);

  return renderNavItem_unstable(state);
});

NavItem.displayName = 'NavItem';
