'use client';

import { useMenu } from './useMenu';
import { useMenuContextValues } from './useMenuContextValues';
import { renderMenu } from './renderMenu';
import { composeComponentWithoutRef } from '../../utils/composeComponent';
import type { ComponentWithoutRef } from '../../utils/composeComponent';
import type { MenuProps } from './Menu.types';

/**
 * Headless Menu component.
 */
export const Menu: ComponentWithoutRef<MenuProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'Menu',
  useMenu,
  useMenuContextValues,
  renderMenu,
);
