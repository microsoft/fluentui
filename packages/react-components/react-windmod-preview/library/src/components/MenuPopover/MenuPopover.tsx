'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderMenuPopover, useMenuPopover } from '@fluentui/react-headless-components-preview/menu';

import type { MenuPopoverProps } from './MenuPopover.types';
import { useMenuPopoverStyles } from './useMenuPopoverStyles';

/**
 * A MenuPopover is the menu's surface — a div the browser promotes into the top layer.
 * Windmod MenuPopover: the headless surface decorated with the Fluent visual contract
 * (Tailwind v4 + CSS Modules).
 */
export const MenuPopover: ForwardRefComponent<MenuPopoverProps> = React.forwardRef((props, ref) => {
  const state = useMenuPopover(props, ref);
  const styled = useMenuPopoverStyles(state);

  return renderMenuPopover(styled);
});

MenuPopover.displayName = 'MenuPopover';
