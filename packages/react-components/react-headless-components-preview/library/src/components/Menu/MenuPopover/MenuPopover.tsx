'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuPopover } from './useMenuPopover';
import { renderMenuPopover } from './renderMenuPopover';
import type { MenuPopoverProps } from '@fluentui/react-menu';
import { composeComponent } from '../../../utils/composeComponent';

export const MenuPopover: ForwardRefComponent<MenuPopoverProps> = /*#__PURE__*/ composeComponent(
  'MenuPopover',
  useMenuPopover,
  renderMenuPopover,
);
