import * as React from 'react';
import { useMenuList } from './useMenuList';
import { renderMenuList } from './renderMenuList';
import { useMenuListContextValues } from './useMenuListContextValues';
import { useMenuListStyles } from './useMenuListStyles';
import type { MenuListProps } from './MenuList.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuList, using the `useMenuList` hook.
 */
export const MenuList: ForwardRefComponent<MenuListProps> = React.forwardRef((props, ref) => {
  const state = useMenuList(props, ref);
  const contextValues = useMenuListContextValues(state);
  useMenuListStyles(state);

  return renderMenuList(state, contextValues);
});

MenuList.displayName = 'MenuList';
