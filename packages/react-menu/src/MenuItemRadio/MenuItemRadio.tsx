import * as React from 'react';
import { useMenuItemRadio } from './useMenuItemRadio';
import { MenuItemRadioProps } from './MenuItemRadio.types';
import { renderMenuItemRadio } from './renderMenuItemRadio';

/**
 * Define a styled MenuItemRadio, using the `useMenuItemRadio` hook.
 * {@docCategory MenuItemRadio}
 */
export const MenuItemRadio = React.forwardRef<HTMLElement, MenuItemRadioProps>((props, ref) => {
  const state = useMenuItemRadio(props, ref);

  return renderMenuItemRadio(state);
});

MenuItemRadio.displayName = 'MenuItemRadio';
