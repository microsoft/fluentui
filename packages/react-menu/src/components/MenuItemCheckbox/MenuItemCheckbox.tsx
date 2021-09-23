import * as React from 'react';
import { useMenuItemCheckbox } from './useMenuItemCheckbox';
import { renderMenuItemCheckbox } from './renderMenuItemCheckbox';
import { useMenuItemCheckBoxStyles } from './useMenuItemCheckboxStyles';
import type { MenuItemCheckboxProps } from './MenuItemCheckbox.types';

/**
 * Define a styled MenuItemCheckbox, using the `useMenuItemCheckbox` hook.
 */
export const MenuItemCheckbox = React.forwardRef<HTMLElement, MenuItemCheckboxProps>((props, ref) => {
  const state = useMenuItemCheckbox(props, ref);
  useMenuItemCheckBoxStyles(state);

  return renderMenuItemCheckbox(state);
});

MenuItemCheckbox.displayName = 'MenuItemCheckbox';
