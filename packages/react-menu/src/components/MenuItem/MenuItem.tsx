import * as React from 'react';
import { useMenuItem_unstable } from './useMenuItem';
import type { MenuItemProps } from './MenuItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuItem, using the `useMenuItem_unstable` and `useMenuItemStyles_unstable` hook.
 */
export const MenuItem: ForwardRefComponent<MenuItemProps> = React.forwardRef((props, ref) => {
  const [state, render] = useMenuItem_unstable(props, ref);
  return render(state);
});

MenuItem.displayName = 'MenuItem';
