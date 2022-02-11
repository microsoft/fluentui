import * as React from 'react';
import { useMenuList_unstable } from './useMenuList';
import type { MenuListProps } from './MenuList.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled MenuList, using the `useMenuList_unstable` hook.
 */
export const MenuList: ForwardRefComponent<MenuListProps> = React.forwardRef((props, ref) => {
  const [state, render, context] = useMenuList_unstable(props, ref);
  return render(state, context);
});

MenuList.displayName = 'MenuList';
