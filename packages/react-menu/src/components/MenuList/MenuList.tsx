import { useMenuList } from './useMenuList';
import { renderMenuList } from './renderMenuList';
import { useMenuListContextValues } from './useMenuListContextValues';
import type { MenuListProps } from './MenuList.types';
import { forwardRef } from '@fluentui/react-utilities';

/**
 * Define a styled MenuList, using the `useMenuList` hook.
 * {@docCategory MenuList}
 */
export const MenuList = forwardRef<MenuListProps>((props, ref) => {
  const state = useMenuList(props, ref);
  const contextValues = useMenuListContextValues(state);

  return renderMenuList(state, contextValues);
});

MenuList.displayName = 'MenuList';
