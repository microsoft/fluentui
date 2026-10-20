'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuDividerProps } from './MenuDivider.types';
import { renderMenuDivider } from './renderMenuDivider';
import { useMenuDivider } from './useMenuDivider';
import { useMenuDividerStyles } from './useMenuDividerStyles.styles';

export const MenuDivider: ForwardRefComponent<MenuDividerProps> = React.forwardRef((props, ref) => {
  const state = useMenuDivider(props, ref);
  useMenuDividerStyles(state);
  return renderMenuDivider(state);
});

MenuDivider.displayName = 'MenuDivider';
