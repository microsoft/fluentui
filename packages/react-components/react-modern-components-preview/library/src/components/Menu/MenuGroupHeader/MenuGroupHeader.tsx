'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuGroupHeaderProps } from './MenuGroupHeader.types';
import { renderMenuGroupHeader } from './renderMenuGroupHeader';
import { useMenuGroupHeader } from './useMenuGroupHeader';
import { useMenuGroupHeaderStyles } from './useMenuGroupHeaderStyles.styles';

export const MenuGroupHeader: ForwardRefComponent<MenuGroupHeaderProps> = React.forwardRef((props, ref) => {
  const state = useMenuGroupHeader(props, ref);
  useMenuGroupHeaderStyles(state);
  return renderMenuGroupHeader(state);
});

MenuGroupHeader.displayName = 'MenuGroupHeader';
