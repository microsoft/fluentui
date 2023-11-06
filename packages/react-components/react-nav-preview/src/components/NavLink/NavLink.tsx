import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavLink_unstable } from './useNavLink';
import { renderNavLink_unstable } from './renderNavLink';
import { useNavLinkStyles_unstable } from './useNavLinkStyles.styles';
import type { NavLinkProps } from './NavLink.types';

/**
 * NavLink component - TODO: add more docs
 */
export const NavLink: ForwardRefComponent<NavLinkProps> = React.forwardRef((props, ref) => {
  const state = useNavLink_unstable(props, ref);

  useNavLinkStyles_unstable(state);
  return renderNavLink_unstable(state);
});

NavLink.displayName = 'NavLink';
