import * as React from 'react';
import { useMenuItemCheckbox } from './useMenuItemCheckbox';
import { renderMenuItemCheckbox } from './renderMenuItemCheckbox';
import { useMenuItemCheckBoxStyles } from './useMenuItemCheckboxStyles';
import type { MenuItemCheckboxProps } from './MenuItemCheckbox.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuItemCheckbox, using the `useMenuItemCheckbox` hook.
 */
export const MenuItemCheckbox: ForwardRefComponent<MenuItemCheckboxProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemCheckbox(props, ref);
  useMenuItemCheckBoxStyles(state);

  return renderMenuItemCheckbox(state);
});

MenuItemCheckbox.displayName = 'MenuItemCheckbox';
