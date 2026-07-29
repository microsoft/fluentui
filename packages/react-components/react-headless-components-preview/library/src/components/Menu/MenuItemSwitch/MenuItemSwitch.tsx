'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuItemSwitch } from './useMenuItemSwitch';
import { renderMenuItemSwitch } from './renderMenuItemSwitch';
import type { MenuItemSwitchProps } from '@fluentui/react-menu';

/**
 * Headless MenuItemSwitch component.
 *
 * Renders a toggle-style menu item with a `switchIndicator` slot. Selection
 * state is driven by the parent MenuList's controlled `checkedValues`.
 */
export const MenuItemSwitch: ForwardRefComponent<MenuItemSwitchProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemSwitch(props, ref);
  return renderMenuItemSwitch(state);
});

MenuItemSwitch.displayName = 'MenuItemSwitch';
