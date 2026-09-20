'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuItemSwitchProps } from './Menu.types';
import { renderMenuItemSwitch } from './renderMenu';
import { useMenuItemSwitch } from './useMenu';
import { useMenuItemSwitchStyles } from './useMenuStyles.styles';

export const MenuItemSwitch: ForwardRefComponent<MenuItemSwitchProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemSwitch(props, ref);
  useMenuItemSwitchStyles(state);
  return renderMenuItemSwitch(state);
});

MenuItemSwitch.displayName = 'MenuItemSwitch';
