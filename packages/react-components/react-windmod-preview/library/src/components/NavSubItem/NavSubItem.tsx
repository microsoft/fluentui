'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderNavSubItem, useNavContext, useNavSubItem } from '@fluentui/react-headless-components-preview/nav';

import type { NavSubItemProps } from './NavSubItem.types';
import { useNavSubItemStyles } from './useNavSubItemStyles';

/**
 * A NavSubItem is a destination nested inside a NavCategory. Windmod NavSubItem: the headless
 * nav sub item decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const NavSubItem: ForwardRefComponent<NavSubItemProps> = React.forwardRef((props, ref) => {
  // The headless context type makes density optional, and a row outside a Nav has no context
  // at all; the default is Griffel's own, spelled per-component as Griffel spells it.
  const { density = 'medium' } = useNavContext();

  return renderNavSubItem(
    useNavSubItemStyles({
      ...useNavSubItem(props, ref as React.Ref<HTMLButtonElement | HTMLAnchorElement>),
      density,
    }),
  );
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<NavSubItemProps>;

NavSubItem.displayName = 'NavSubItem';
