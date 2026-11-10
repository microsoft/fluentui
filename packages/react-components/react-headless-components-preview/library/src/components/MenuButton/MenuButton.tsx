'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuButtonProps } from './MenuButton.types';
import { useMenuButton } from './useMenuButton';
import { renderMenuButton } from './renderMenuButton';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A button that opens a menu, indicated by a chevron icon.
 */
export const MenuButton: ForwardRefComponent<MenuButtonProps> = /*#__PURE__*/ composeComponent(
  'MenuButton',
  useMenuButton,
  renderMenuButton,
);
