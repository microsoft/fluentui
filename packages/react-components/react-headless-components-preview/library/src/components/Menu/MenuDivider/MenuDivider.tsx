'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuDivider } from './useMenuDivider';
import { renderMenuDivider } from './renderMenuDivider';
import type { MenuDividerProps } from '@fluentui/react-menu';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Headless MenuDivider component.
 *
 * Renders an `aria-hidden` `role="presentation"` separator inside a MenuList.
 */
export const MenuDivider: ForwardRefComponent<MenuDividerProps> = /*#__PURE__*/ composeComponent(
  'MenuDivider',
  useMenuDivider,
  renderMenuDivider,
);
