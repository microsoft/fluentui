import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuListContextValues, MenuListSlots, MenuListState } from './MenuList.types';
import { MenuListProvider } from '../../contexts/menuListContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuList_unstable = (state: MenuListState, contextValues: MenuListContextValues) => {
  const { slots, slotProps } = getSlots<MenuListSlots>(state);

  return (
    <MenuListProvider value={contextValues.menuList}>
      <slots.root {...slotProps.root} />
    </MenuListProvider>
  );
};
