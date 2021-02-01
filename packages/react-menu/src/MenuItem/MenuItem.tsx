import * as React from 'react';
import { getAbilityHelpersAttribute, Types } from 'ability-helpers';
import { useMenuItem } from './useMenuItem';
import { MenuItemProps } from './MenuItem.types';
import { renderMenuItem } from './renderMenuItem';

/**
 * Define a styled MenuItem, using the `useMenuItem` hook.
 * {@docCategory MenuItem}
 */
export const MenuItem = React.forwardRef<HTMLElement, MenuItemProps>((props, ref) => {
  const ahProps = getAbilityHelpersAttribute({ groupper: { isLimited: Types.GroupperFocusLimits.Limited } });
  const state = useMenuItem(props, ref, {
    role: 'menuitem',
    tabIndex: 0,
    ...ahProps,
  });

  return renderMenuItem(state);
});

MenuItem.displayName = 'MenuItem';
