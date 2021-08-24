import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
<<<<<<< HEAD
=======
import { MenuListContextValues, MenuListSlots, MenuListState } from './MenuList.types';
>>>>>>> Updates react-menu to use root as slot
import { MenuListProvider } from '../../contexts/menuListContext';
import type { MenuListContextValues, MenuListState } from './MenuList.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuList = (state: MenuListState, contextValues: MenuListContextValues) => {
  const { slots, slotProps } = getSlots<MenuListSlots>(state);

  return (
    <MenuListProvider value={contextValues.menuList}>
      <slots.root {...slotProps.root} />
    </MenuListProvider>
  );
};
