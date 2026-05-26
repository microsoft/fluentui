'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuDivider } from './useMenuDivider';
import { renderMenuDivider } from './renderMenuDivider';
import type { MenuDividerProps } from '@fluentui/react-menu';

/**
 * Headless MenuDivider component.
 *
 * Renders an `aria-hidden` `role="presentation"` separator inside a MenuList.
 */
export const MenuDivider: ForwardRefComponent<MenuDividerProps> = React.forwardRef((props, ref) => {
  const state = useMenuDivider(props, ref);
  return renderMenuDivider(state);
});

MenuDivider.displayName = 'MenuDivider';
