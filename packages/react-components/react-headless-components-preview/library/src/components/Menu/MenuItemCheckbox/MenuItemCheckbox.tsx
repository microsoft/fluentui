'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuItemCheckbox } from './useMenuItemCheckbox';
import { renderMenuItemCheckbox } from './renderMenuItemCheckbox';
import type { MenuItemCheckboxProps } from './MenuItemCheckbox.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Headless MenuItemCheckbox component.
 *
 * Renders a multi-select item with `role="menuitemcheckbox"` and ARIA
 * `aria-checked` driven by the parent MenuList's controlled `checkedValues`.
 */
export const MenuItemCheckbox: ForwardRefComponent<MenuItemCheckboxProps> = /*#__PURE__*/ composeComponent(
  'MenuItemCheckbox',
  useMenuItemCheckbox,
  renderMenuItemCheckbox,
);
