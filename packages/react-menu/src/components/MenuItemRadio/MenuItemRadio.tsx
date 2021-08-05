import * as React from 'react';
import { useMenuItemRadio } from './useMenuItemRadio';
import { MenuItemRadioProps } from './MenuItemRadio.types';
import { renderMenuItemRadio } from './renderMenuItemRadio';
import { useMenuItemRadioStyles } from './useMenuItemRadioStyles';

/**
 * Define a styled MenuItemRadio, using the `useMenuItemRadio` hook.
 * {@docCategory MenuItemRadio}
 */
export const MenuItemRadio = React.forwardRef<HTMLElement, MenuItemRadioProps>((props, ref) => {
  const state = useMenuItemRadio(props, ref);
  useMenuItemRadioStyles(state);

  return renderMenuItemRadio(state);
});

MenuItemRadio.displayName = 'MenuItemRadio';
