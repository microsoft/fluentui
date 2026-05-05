'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuPopover } from './useMenuPopover';
import { renderMenuPopover } from './renderMenuPopover';
import type { MenuPopoverProps } from './MenuPopover.types';

/**
 * Headless MenuPopover component.
 *
 * Renders the surface in the browser top layer via native `popover="auto"`.
 * Light dismiss (Escape, outside click) is owned by both the native popover
 * API and v9's React-side handlers (`useOnClickOutside`, Escape/Tab handlers
 * in `useMenuPopoverBase_unstable`); the two paths converge on `setOpen`.
 */
export const MenuPopover: ForwardRefComponent<MenuPopoverProps> = React.forwardRef((props, ref) => {
  const state = useMenuPopover(props, ref);
  return renderMenuPopover(state);
});

MenuPopover.displayName = 'MenuPopover';
