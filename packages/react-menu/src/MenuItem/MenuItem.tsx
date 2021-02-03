import * as React from 'react';
import { useMenuItem } from './useMenuItem';
import { MenuItemProps } from './MenuItem.types';
import { renderMenuItem } from './renderMenuItem';
import { useMenuItemStyles } from './useMenuItemStyles';

/**
 * Define a styled MenuItem, using the `useMenuItem` hook.
 * {@docCategory MenuItem}
 */
export const MenuItem = React.forwardRef<HTMLElement, MenuItemProps>((props, ref) => {
  const state = useMenuItem(props, ref, {
    role: 'menuitem',
    tabIndex: 0,
  });

  useMenuItemStyles(state);
  return renderMenuItem(state);
});

MenuItem.displayName = 'MenuItem';
