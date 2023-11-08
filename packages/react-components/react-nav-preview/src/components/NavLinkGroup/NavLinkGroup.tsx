import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useNavLinkGroup_unstable } from './useNavLinkGroup';
import { renderNavLinkGroup_unstable } from './renderNavLinkGroup';
import { useNavLinkGroupStyles_unstable } from './useNavLinkGroupStyles.styles';
import type { NavLinkGroupProps } from './NavLinkGroup.types';

/**
 * NavLinkGroup component - TODO: add more docs
 */
export const NavLinkGroup: ForwardRefComponent<NavLinkGroupProps> = React.forwardRef((props, ref) => {
  const state = useNavLinkGroup_unstable(props, ref);

  useNavLinkGroupStyles_unstable(state);
  return renderNavLinkGroup_unstable(state);
});

NavLinkGroup.displayName = 'NavLinkGroup';
