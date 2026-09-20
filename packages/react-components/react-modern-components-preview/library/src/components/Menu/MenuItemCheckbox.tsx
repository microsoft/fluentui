'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuItemCheckboxProps } from './Menu.types';
import { renderMenuItemCheckbox } from './renderMenu';
import { useMenuItemCheckbox } from './useMenu';
import { useMenuItemCheckboxStyles } from './useMenuStyles.styles';

export const MenuItemCheckbox: ForwardRefComponent<MenuItemCheckboxProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemCheckbox(props, ref);
  useMenuItemCheckboxStyles(state);
  return renderMenuItemCheckbox(state);
}) as ForwardRefComponent<MenuItemCheckboxProps>;

MenuItemCheckbox.displayName = 'MenuItemCheckbox';
