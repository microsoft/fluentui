'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuPopoverProps } from './Menu.types';
import { renderMenuPopover } from './renderMenu';
import { useMenuPopover } from './useMenu';
import { useMenuPopoverStyles } from './useMenuStyles.styles';

export const MenuPopover: ForwardRefComponent<MenuPopoverProps> = React.forwardRef((props, ref) => {
  const state = useMenuPopover(props, ref);
  useMenuPopoverStyles(state);
  return renderMenuPopover(state);
});

MenuPopover.displayName = 'MenuPopover';
