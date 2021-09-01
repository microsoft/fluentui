import * as React from 'react';
import { useMenuItemRadio } from './useMenuItemRadio';
import { renderMenuItemRadio } from './renderMenuItemRadio';
import { useMenuItemRadioStyles } from './useMenuItemRadioStyles';
import type { MenuItemRadioProps } from './MenuItemRadio.types';

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
