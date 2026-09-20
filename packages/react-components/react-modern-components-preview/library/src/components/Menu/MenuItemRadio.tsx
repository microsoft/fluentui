'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuItemRadioProps } from './Menu.types';
import { renderMenuItemRadio } from './renderMenu';
import { useMenuItemRadio } from './useMenu';
import { useMenuItemRadioStyles } from './useMenuStyles.styles';

export const MenuItemRadio: ForwardRefComponent<MenuItemRadioProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemRadio(props, ref);
  useMenuItemRadioStyles(state);
  return renderMenuItemRadio(state);
}) as ForwardRefComponent<MenuItemRadioProps>;

MenuItemRadio.displayName = 'MenuItemRadio';
