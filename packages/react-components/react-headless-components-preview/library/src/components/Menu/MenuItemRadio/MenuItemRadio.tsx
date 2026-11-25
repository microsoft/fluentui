'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuItemRadio } from './useMenuItemRadio';
import { renderMenuItemRadio } from './renderMenuItemRadio';
import type { MenuItemRadioProps } from './MenuItemRadio.types';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Headless MenuItemRadio component.
 */
export const MenuItemRadio: ForwardRefComponent<MenuItemRadioProps> = /*#__PURE__*/ composeComponent(
  'MenuItemRadio',
  useMenuItemRadio,
  renderMenuItemRadio,
);
