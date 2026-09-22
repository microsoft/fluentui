'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { MenuListProps } from './MenuList.types';
import { renderMenuList } from './renderMenuList';
import { useMenuList, useMenuListContextValues } from './useMenuList';
import { useMenuListStyles } from './useMenuListStyles.styles';

export const MenuList: ForwardRefComponent<MenuListProps> = React.forwardRef((props, ref) => {
  const state = useMenuList(props, ref);
  const contextValues = useMenuListContextValues(state);
  useMenuListStyles(state);

  return renderMenuList(state, contextValues);
});

MenuList.displayName = 'MenuList';
