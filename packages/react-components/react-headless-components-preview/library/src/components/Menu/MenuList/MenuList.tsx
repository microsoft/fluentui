'use client';

import * as React from 'react';
import { useMenuListContextValues_unstable } from '@fluentui/react-menu';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useMenuList } from './useMenuList';
import { renderMenuList } from './renderMenuList';
import { MenuListPresenceProvider } from '../menuListPresenceContext';
import type { MenuListProps } from './MenuList.types';

/**
 * Headless MenuList component.
 */
export const MenuList: ForwardRefComponent<MenuListProps> = React.forwardRef((props, ref) => {
  const state = useMenuList(props, ref);
  const contextValues = useMenuListContextValues_unstable(state);
  return <MenuListPresenceProvider value={true}>{renderMenuList(state, contextValues)}</MenuListPresenceProvider>;
});

MenuList.displayName = 'MenuList';
