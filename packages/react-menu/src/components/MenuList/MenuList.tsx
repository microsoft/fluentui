import * as React from 'react';
import { useMenuList_unstable } from './useMenuList';
import { renderMenuList } from './renderMenuList';
import { useMenuListContextValues_unstable } from './useMenuListContextValues';
import { useMenuListStyles_unstable } from './useMenuListStyles';
import type { MenuListProps } from './MenuList.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuList, using the `useMenuList_unstable` hook.
 */
export const MenuList: ForwardRefComponent<MenuListProps> = React.forwardRef((props, ref) => {
  const state = useMenuList_unstable(props, ref);
  const contextValues = useMenuListContextValues_unstable(state);
  useMenuListStyles_unstable(state);

  return renderMenuList(state, contextValues);
});

MenuList.displayName = 'MenuList';
