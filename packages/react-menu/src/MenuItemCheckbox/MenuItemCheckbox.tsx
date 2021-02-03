import * as React from 'react';
import { useMenuItemCheckbox } from './useMenuItemCheckbox';
import { MenuItemCheckboxProps } from './MenuItemCheckbox.types';
import { renderMenuItemCheckbox } from './renderMenuItemCheckbox';

/**
 * Define a styled MenuItemCheckbox, using the `useMenuItemCheckbox` hook.
 * {@docCategory MenuItemCheckbox}
 */
export const MenuItemCheckbox = React.forwardRef<HTMLElement, MenuItemCheckboxProps>((props, ref) => {
  const state = useMenuItemCheckbox(props, ref);

  return renderMenuItemCheckbox(state);
});

MenuItemCheckbox.displayName = 'MenuItemCheckbox';
