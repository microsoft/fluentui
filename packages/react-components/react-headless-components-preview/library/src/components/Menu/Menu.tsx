'use client';

import type * as React from 'react';
import { useMenu } from './useMenu';
import { useMenuContextValues } from './useMenuContextValues';
import { renderMenu } from './renderMenu';
import type { MenuProps } from './Menu.types';
import { composeComponentWithoutRef } from '../../utils/composeComponent';

/**
 * Headless Menu component.
 */
export const Menu: React.FC<MenuProps> = /*#__PURE__*/ composeComponentWithoutRef(
  'Menu',
  useMenu,
  useMenuContextValues,
  renderMenu,
);
