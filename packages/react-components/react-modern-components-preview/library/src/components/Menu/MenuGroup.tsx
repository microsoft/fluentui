'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuGroupProps } from './Menu.types';
import { renderMenuGroup } from './renderMenu';
import { useMenuGroup, useMenuGroupContextValues } from './useMenu';
import { useMenuGroupStyles } from './useMenuStyles.styles';

export const MenuGroup: ForwardRefComponent<MenuGroupProps> = React.forwardRef((props, ref) => {
  const state = useMenuGroup(props, ref);
  const contextValues = useMenuGroupContextValues(state);
  useMenuGroupStyles(state);
  return renderMenuGroup(state, contextValues);
});

MenuGroup.displayName = 'MenuGroup';
