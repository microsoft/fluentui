import * as React from 'react';
import { useMenuItemRadio_unstable } from './useMenuItemRadio';
import type { MenuItemRadioProps } from './MenuItemRadio.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuItemRadio, using the `useMenuItemRadio_unstable` hook.
 */
export const MenuItemRadio: ForwardRefComponent<MenuItemRadioProps> = React.forwardRef((props, ref) => {
  const [state, render] = useMenuItemRadio_unstable(props, ref);
  return render(state);
});

MenuItemRadio.displayName = 'MenuItemRadio';
