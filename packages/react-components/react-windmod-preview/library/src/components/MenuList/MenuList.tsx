'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderMenuList,
  useMenuList,
  useMenuListContextValues,
} from '@fluentui/react-headless-components-preview/menu';

import type { MenuListProps } from './MenuList.types';
import { useMenuListStyles } from './useMenuListStyles';

/**
 * A MenuList holds a menu's items. Windmod MenuList: the headless list decorated with the Fluent
 * visual contract (Tailwind v4 + CSS Modules).
 */
export const MenuList: ForwardRefComponent<MenuListProps> = React.forwardRef(
  (props: MenuListProps, ref: React.Ref<HTMLElement>) => {
    const state = useMenuListStyles(useMenuList(props, ref));

    return renderMenuList(state, useMenuListContextValues(state));
  },
  // Casting is required due to lack of distributive union to support union on @types/react
) as ForwardRefComponent<MenuListProps>;

MenuList.displayName = 'MenuList';
