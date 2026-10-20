'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuItemCheckboxProps } from './MenuItemCheckbox.types';
import { renderMenuItemCheckbox } from './renderMenuItemCheckbox';
import { useMenuItemCheckbox } from './useMenuItemCheckbox';
import { useMenuItemCheckboxStyles } from './useMenuItemCheckboxStyles.styles';

export const MenuItemCheckbox: ForwardRefComponent<MenuItemCheckboxProps> = React.forwardRef((props, ref) => {
  const state = useMenuItemCheckbox(props, ref);
  useMenuItemCheckboxStyles(state);
  return renderMenuItemCheckbox(state);
}) as ForwardRefComponent<MenuItemCheckboxProps>;

MenuItemCheckbox.displayName = 'MenuItemCheckbox';
