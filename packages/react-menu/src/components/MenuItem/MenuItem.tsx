import * as React from 'react';
import { useMenuItem } from './useMenuItem';
import { renderMenuItem } from './renderMenuItem';
import { useMenuItemStyles } from './useMenuItemStyles';
import { useCheckmarkStyles } from '../../selectable/index';
import type { MenuItemProps } from './MenuItem.types';
import type { MenuItemCheckboxState } from '../MenuItemCheckbox/index';

/**
 * Define a styled MenuItem, using the `useMenuItem` and `useMenuItemStyles` hook.
 * {@docCategory MenuItem}
 */
export const MenuItem = React.forwardRef<HTMLElement, MenuItemProps>((props, ref) => {
  const state = useMenuItem(props, ref);

  useMenuItemStyles(state);
  useCheckmarkStyles(state as MenuItemCheckboxState);
  return renderMenuItem(state);
});

MenuItem.displayName = 'MenuItem';
