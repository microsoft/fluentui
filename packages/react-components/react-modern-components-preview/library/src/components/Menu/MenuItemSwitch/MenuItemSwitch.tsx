'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuItemSwitchProps } from './MenuItemSwitch.types';
import { renderMenuItemSwitch } from './renderMenuItemSwitch';
import { useMenuItemSwitch } from './useMenuItemSwitch';
import { useMenuItemSwitchStyles } from './useMenuItemSwitchStyles.styles';

export const MenuItemSwitch: ForwardRefComponent<MenuItemSwitchProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemSwitch(props, ref);
  useMenuItemSwitchStyles(state);
  return renderMenuItemSwitch(state);
});

MenuItemSwitch.displayName = 'MenuItemSwitch';
