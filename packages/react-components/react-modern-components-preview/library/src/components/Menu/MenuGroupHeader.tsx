'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuGroupHeaderProps } from './Menu.types';
import { renderMenuGroupHeader } from './renderMenu';
import { useMenuGroupHeader } from './useMenu';
import { useMenuGroupHeaderStyles } from './useMenuStyles.styles';

export const MenuGroupHeader: ForwardRefComponent<MenuGroupHeaderProps> = React.forwardRef((props, ref) => {
  const state = useMenuGroupHeader(props, ref);
  useMenuGroupHeaderStyles(state);
  return renderMenuGroupHeader(state);
});

MenuGroupHeader.displayName = 'MenuGroupHeader';
