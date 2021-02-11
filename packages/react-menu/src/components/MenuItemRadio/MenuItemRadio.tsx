import * as React from 'react';
import { useMenuItemRadio } from './useMenuItemRadio';
import { MenuItemRadioProps } from './MenuItemRadio.types';
import { renderMenuItemRadio } from './renderMenuItemRadio';
import { useMenuItemStyles } from '../MenuItem/useMenuItemStyles';
import { useCheckmarkStyles } from '../../selectable/index';

/**
 * Define a styled MenuItemRadio, using the `useMenuItemRadio` hook.
 * {@docCategory MenuItemRadio}
 */
export const MenuItemRadio = React.forwardRef<HTMLElement, MenuItemRadioProps>((props, ref) => {
  const state = useMenuItemRadio(props, ref);
  useMenuItemStyles(state);
  useCheckmarkStyles(state);

  return renderMenuItemRadio(state);
});

MenuItemRadio.displayName = 'MenuItemRadio';
