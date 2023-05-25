import * as React from 'react';
import { useMenuList_unstable } from './useMenuList';
import { renderMenuList_unstable } from './renderMenuList';
import { useMenuListContextValues_unstable } from './useMenuListContextValues';
import { useMenuListStyles_unstable } from './useMenuListStyles.styles';
import type { MenuListProps } from './MenuList.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Define a styled MenuList, using the `useMenuList_unstable` hook.
 */
export const MenuList: ForwardRefComponent<MenuListProps> = React.forwardRef((props, ref) => {
  const state = useMenuList_unstable(props, ref);
  const contextValues = useMenuListContextValues_unstable(state);

  useMenuListStyles_unstable(state);

  useCustomStyleHook_unstable('useMenuListStyles_unstable')(state);

  return renderMenuList_unstable(state, contextValues);
});

MenuList.displayName = 'MenuList';
