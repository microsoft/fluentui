'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuPopoverProps } from './MenuPopover.types';
import { renderMenuPopover } from './renderMenuPopover';
import { useMenuPopover } from './useMenuPopover';
import { useMenuPopoverStyles } from './useMenuPopoverStyles.styles';

export const MenuPopover: ForwardRefComponent<MenuPopoverProps> = React.forwardRef((props, ref) => {
  const state = useMenuPopover(props, ref);
  useMenuPopoverStyles(state);
  return renderMenuPopover(state);
});

MenuPopover.displayName = 'MenuPopover';
