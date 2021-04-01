import * as React from 'react';
import { getSlots, DescendantProvider } from '@fluentui/react-utilities';
import { MenuListState } from './MenuList.types';
import { MenuListProvider } from '../../contexts/menuListContext';
import { MenuListDescendantContext } from '../../contexts/menuListDescendants';

/**
 * Function that renders the final JSX of the component
 */
export const renderMenuList = (state: MenuListState) => {
  const { slots, slotProps } = getSlots(state);
  const { onCheckedValueChange, checkedValues, toggleCheckbox, selectRadio, setFocusByFirstCharacter } = state;

  return (
    <MenuListProvider
      value={{ onCheckedValueChange, checkedValues, toggleCheckbox, selectRadio, setFocusByFirstCharacter }}
    >
      <DescendantProvider context={MenuListDescendantContext} set={state.setDescendants} items={state.descendants}>
        <slots.root {...slotProps.root}>{state.children}</slots.root>
      </DescendantProvider>
    </MenuListProvider>
  );
};
