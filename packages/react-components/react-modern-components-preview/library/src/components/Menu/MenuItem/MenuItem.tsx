'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuItemProps } from './MenuItem.types';
import { renderMenuItem } from './renderMenuItem';
import { useMenuItem } from './useMenuItem';
import { useMenuItemStyles } from './useMenuItemStyles.styles';

export const MenuItem: ForwardRefComponent<MenuItemProps> = React.forwardRef((props, ref) => {
  const state = useMenuItem(props, ref);
  useMenuItemStyles(state);
  return renderMenuItem(state);
}) as ForwardRefComponent<MenuItemProps>;

MenuItem.displayName = 'MenuItem';
