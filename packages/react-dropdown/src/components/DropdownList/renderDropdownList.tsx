import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { DropdownListState } from './DropdownList.types';
import { DropdownListProvider } from '../../contexts/dropdownListContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderDropdownList = (state: DropdownListState) => {
  const { slots, slotProps } = getSlots(state);
  const { onCheckedValueChange, checkedValues, setFocusByFirstCharacter } = state;

  return (
    <DropdownListProvider
      value={{
        onCheckedValueChange,
        checkedValues,
        setFocusByFirstCharacter,
      }}
    >
      <slots.root {...slotProps.root}>{state.children}</slots.root>
    </DropdownListProvider>
  );
};
