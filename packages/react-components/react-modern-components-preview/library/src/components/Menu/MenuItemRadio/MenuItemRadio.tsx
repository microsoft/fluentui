'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuItemRadioProps } from './MenuItemRadio.types';
import { renderMenuItemRadio } from './renderMenuItemRadio';
import { useMenuItemRadio } from './useMenuItemRadio';
import { useMenuItemRadioStyles } from './useMenuItemRadioStyles.styles';

export const MenuItemRadio: ForwardRefComponent<MenuItemRadioProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemRadio(props, ref);
  useMenuItemRadioStyles(state);
  return renderMenuItemRadio(state);
}) as ForwardRefComponent<MenuItemRadioProps>;

MenuItemRadio.displayName = 'MenuItemRadio';
