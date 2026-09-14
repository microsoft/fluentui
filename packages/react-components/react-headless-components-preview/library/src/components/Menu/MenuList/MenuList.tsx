'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuList } from './useMenuList';
import { useMenuListContextValues } from './useMenuListContextValues';
import { renderMenuList } from './renderMenuList';
import type { MenuListProps } from './MenuList.types';

/**
 * Headless MenuList component.
 */
export const MenuList: ForwardRefComponent<MenuListProps> = React.forwardRef((props, ref) => {
  const state = useMenuList(props, ref);
  const contextValues = useMenuListContextValues(state);
  return renderMenuList(state, contextValues);
});

MenuList.displayName = 'MenuList';
