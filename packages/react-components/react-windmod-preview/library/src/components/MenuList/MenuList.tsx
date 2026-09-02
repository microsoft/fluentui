'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderMenuList,
  useMenuList,
  useMenuListContextValues,
} from '@fluentui/react-headless-components-preview/menu';

import { MenuItemContextProvider } from '../MenuItem/menuItemContext';
import type { MenuListProps } from './MenuList.types';
import { useMenuListStyles } from './useMenuListStyles';

/**
 * A list is where a new run of menu items begins, so item defaults published outside it stop here.
 * Without the boundary a MenuSplitGroup's seam would reach the items of a submenu opened from one of
 * its halves: that surface is a native top-layer element, which stays in the DOM and in the React
 * tree beneath the group. Griffel bounds its own seam selector with a child combinator instead.
 */
const NEW_ITEM_SCOPE = {};

/**
 * A MenuList holds a menu's items. Windmod MenuList: the headless list decorated with the Fluent
 * visual contract (Tailwind v4 + CSS Modules).
 */
export const MenuList: ForwardRefComponent<MenuListProps> = React.forwardRef(
  (props: MenuListProps, ref: React.Ref<HTMLElement>) => {
    const state = useMenuListStyles(useMenuList(props, ref));

    return (
      <MenuItemContextProvider value={NEW_ITEM_SCOPE}>
        {renderMenuList(state, useMenuListContextValues(state))}
      </MenuItemContextProvider>
    );
  },
);

MenuList.displayName = 'MenuList';
