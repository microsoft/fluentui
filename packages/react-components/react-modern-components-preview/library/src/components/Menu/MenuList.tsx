'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuListProps } from './Menu.types';
import { renderMenuList } from './renderMenu';
import { useMenuList, useMenuListContextValues } from './useMenu';
import { useMenuListStyles } from './useMenuStyles.styles';

export const MenuList: ForwardRefComponent<MenuListProps> = React.forwardRef((props, ref) => {
  const state = useMenuList(props, ref);
  const contextValues = useMenuListContextValues(state);
  useMenuListStyles(state);

  return renderMenuList(state, contextValues);
});

MenuList.displayName = 'MenuList';
