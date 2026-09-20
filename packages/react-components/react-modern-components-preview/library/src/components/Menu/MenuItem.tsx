'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuItemProps } from './Menu.types';
import { renderMenuItem } from './renderMenu';
import { useMenuItem } from './useMenu';
import { useMenuItemStyles } from './useMenuStyles.styles';

export const MenuItem: ForwardRefComponent<MenuItemProps> = React.forwardRef((props, ref) => {
  const state = useMenuItem(props, ref);
  useMenuItemStyles(state);
  return renderMenuItem(state);
}) as ForwardRefComponent<MenuItemProps>;

MenuItem.displayName = 'MenuItem';
