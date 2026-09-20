'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuDividerProps } from './Menu.types';
import { renderMenuDivider } from './renderMenu';
import { useMenuDivider } from './useMenu';
import { useMenuDividerStyles } from './useMenuStyles.styles';

export const MenuDivider: ForwardRefComponent<MenuDividerProps> = React.forwardRef((props, ref) => {
  const state = useMenuDivider(props, ref);
  useMenuDividerStyles(state);
  return renderMenuDivider(state);
});

MenuDivider.displayName = 'MenuDivider';
