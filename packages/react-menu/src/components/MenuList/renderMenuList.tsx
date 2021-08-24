import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuListProvider } from '../../contexts/menuListContext';
import type { MenuListContextValues, MenuListState } from './MenuList.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuList = (state: MenuListState, contextValues: MenuListContextValues) => {
  const { slots, slotProps } = getSlots(state);

  return (
    <MenuListProvider value={contextValues.menuList}>
      <slots.root {...slotProps.root}>{state.children}</slots.root>
    </MenuListProvider>
  );
};
