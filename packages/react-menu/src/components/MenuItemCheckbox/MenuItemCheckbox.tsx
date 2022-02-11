import * as React from 'react';
import { useMenuItemCheckbox_unstable } from './useMenuItemCheckbox';
import type { MenuItemCheckboxProps } from './MenuItemCheckbox.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuItemCheckbox, using the `useMenuItemCheckbox_unstable` hook.
 */
export const MenuItemCheckbox: ForwardRefComponent<MenuItemCheckboxProps> = React.forwardRef((props, ref) => {
  const [state, render] = useMenuItemCheckbox_unstable(props, ref);
  return render(state);
});

MenuItemCheckbox.displayName = 'MenuItemCheckbox';
