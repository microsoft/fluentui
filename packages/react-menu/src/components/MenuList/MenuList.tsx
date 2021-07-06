import * as React from 'react';
import { useMenuList } from './useMenuList';
import { MenuListProps } from './MenuList.types';
import { renderMenuList } from './renderMenuList';

/**
 * Define a styled MenuList, using the `useMenuList` hook.
 * {@docCategory MenuList}
 */
export const MenuList: React.FunctionComponent<MenuListProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  MenuListProps
>((props, ref) => {
  const state = useMenuList(props, ref);

  return renderMenuList(state);
});

MenuList.displayName = 'MenuList';
