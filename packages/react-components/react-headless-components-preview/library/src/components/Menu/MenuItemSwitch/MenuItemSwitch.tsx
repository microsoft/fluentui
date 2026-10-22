'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuItemSwitch } from './useMenuItemSwitch';
import { renderMenuItemSwitch } from './renderMenuItemSwitch';
import type { MenuItemSwitchProps } from './MenuItemSwitch.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Headless MenuItemSwitch component.
 *
 * Renders a toggle-style menu item with a `switchIndicator` slot. Selection
 * state is driven by the parent MenuList's controlled `checkedValues`.
 */
export const MenuItemSwitch: ForwardRefComponent<MenuItemSwitchProps> = /*#__PURE__*/ composeComponent(
  'MenuItemSwitch',
  useMenuItemSwitch,
  renderMenuItemSwitch,
);
