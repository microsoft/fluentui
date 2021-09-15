import { useMenuItemCheckbox } from './useMenuItemCheckbox';
import { renderMenuItemCheckbox } from './renderMenuItemCheckbox';
import { useMenuItemCheckBoxStyles } from './useMenuItemCheckboxStyles';
import type { MenuItemCheckboxProps } from './MenuItemCheckbox.types';
import { forwardRef } from '@fluentui/react-utilities';

/**
 * Define a styled MenuItemCheckbox, using the `useMenuItemCheckbox` hook.
 * {@docCategory MenuItemCheckbox}
 */
export const MenuItemCheckbox = forwardRef<MenuItemCheckboxProps>((props, ref) => {
  const state = useMenuItemCheckbox(props, ref);
  useMenuItemCheckBoxStyles(state);

  return renderMenuItemCheckbox(state);
});

MenuItemCheckbox.displayName = 'MenuItemCheckbox';
