import * as React from 'react';
import { useMenuItemCheckbox_unstable } from './useMenuItemCheckbox';
import { renderMenuItemCheckbox_unstable } from './renderMenuItemCheckbox';
import { useMenuItemCheckboxStyles_unstable } from './useMenuItemCheckboxStyles';
import type { MenuItemCheckboxProps } from './MenuItemCheckbox.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuItemCheckbox, using the `useMenuItemCheckbox_unstable` hook.
 */
export const MenuItemCheckbox: ForwardRefComponent<MenuItemCheckboxProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemCheckbox_unstable(props, ref);
  useMenuItemCheckboxStyles_unstable(state);

  return renderMenuItemCheckbox_unstable(state);
});

MenuItemCheckbox.displayName = 'MenuItemCheckbox';
