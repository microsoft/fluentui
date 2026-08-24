'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderNavItem, useNavContext, useNavItem } from '@fluentui/react-headless-components-preview/nav';

import type { NavItemProps, NavItemState } from './NavItem.types';
import { useNavItemStyles } from './useNavItemStyles';

/**
 * A NavItem is a single destination in a Nav. Windmod NavItem: the headless nav item decorated
 * with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const NavItem: ForwardRefComponent<NavItemProps> = React.forwardRef((props, ref) => {
  // The headless context type makes density optional, and a row outside a Nav has no context
  // at all; the default is Griffel's own, spelled per-component as Griffel spells it.
  const { density = 'medium' } = useNavContext();

  const state: NavItemState = {
    ...useNavItem(props, ref as React.Ref<HTMLButtonElement | HTMLAnchorElement>),
    density,
  };

  return renderNavItem(useNavItemStyles(state));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<NavItemProps>;

NavItem.displayName = 'NavItem';
