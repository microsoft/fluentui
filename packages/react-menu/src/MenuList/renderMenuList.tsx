import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuListState } from './MenuList.types';
import { MenuListProvider } from '../menuListContext';

/**
 * Define the render function. Given the state of a button, renders it.
 */
export const renderMenuList = (state: MenuListState) => {
  const { slots, slotProps } = getSlots(state);
  const { onCheckedValuesChange, checkedValues } = state;

  return (
    <MenuListProvider value={{ onCheckedValuesChange, checkedValues, triggerRef: null }}>
      <slots.root {...slotProps.root}>{state.children}</slots.root>
    </MenuListProvider>
  );
};
