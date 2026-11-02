'use client';

import { useMenu } from './useMenu';
import { useMenuContextValues } from './useMenuContextValues';
import { renderMenu } from './renderMenu';
import { composeComponentWithoutRef } from '../../utils/composeComponent';

/**
 * Headless Menu component.
 */
export const Menu = /*#__PURE__*/ composeComponentWithoutRef('Menu', useMenu, useMenuContextValues, renderMenu);
