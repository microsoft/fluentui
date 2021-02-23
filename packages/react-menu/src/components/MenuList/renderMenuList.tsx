import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuListState } from './MenuList.types';
import { MenuListProvider } from '../../menuListContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuList = (state: MenuListState) => {
  const { slots, slotProps } = getSlots(state);
  const { onCheckedValueChange, checkedValues, setFocusByFirstCharacter } = state;

  return (
    <MenuListProvider value={{ onCheckedValueChange, checkedValues, setFocusByFirstCharacter }}>
      <slots.root {...slotProps.root}>{state.children}</slots.root>
    </MenuListProvider>
  );
};
