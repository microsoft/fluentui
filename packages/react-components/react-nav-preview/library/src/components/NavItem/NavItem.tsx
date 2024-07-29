import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useNavItem_unstable } from './useNavItem';
import { renderNavItem_unstable } from './renderNavItem';
import { useNavItemStyles_unstable } from './useNavItemStyles.styles';
import type { NavItemProps } from './NavItem.types';

/**
 * NavItem component - TODO: add more docs
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const NavItem: ForwardRefComponent<NavItemProps> = React.forwardRef((props, ref) => {
  const state = useNavItem_unstable(props, ref);

  useNavItemStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useNavItemStyles_unstable')(state);
  return renderNavItem_unstable(state);
  //FIXME: migrate to fc to remove this assertion
  // Casting is required due to lack of distributive union to support unions on @types/react
  // eslint-disable-next-line deprecation/deprecation
}) as ForwardRefComponent<NavItemProps>;

NavItem.displayName = 'NavItem';
