'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuPopover } from './useMenuPopover';
import { renderMenuPopover } from './renderMenuPopover';
import type { MenuPopoverProps } from './MenuPopover.types';

export const MenuPopover: ForwardRefComponent<MenuPopoverProps> = React.forwardRef((props, ref) => {
  const state = useMenuPopover(props, ref);
  return renderMenuPopover(state);
});

MenuPopover.displayName = 'MenuPopover';
