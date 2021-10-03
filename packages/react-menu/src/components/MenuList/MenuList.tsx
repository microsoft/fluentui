import * as React from 'react';
import { useMenuList } from './useMenuList';
import { renderMenuList } from './renderMenuList';
import { useMenuListContextValues } from './useMenuListContextValues';
import type { MenuListProps } from './MenuList.types';
import { useMenuListStyles } from './useMenuListStyles';

/**
 * Define a styled MenuList, using the `useMenuList` hook.
 */
export const MenuList = React.forwardRef<HTMLDivElement, MenuListProps>((props, ref) => {
  const state = useMenuList(props, ref);
  const contextValues = useMenuListContextValues(state);
  useMenuListStyles(state);

  return renderMenuList(state, contextValues);
});

MenuList.displayName = 'MenuList';
