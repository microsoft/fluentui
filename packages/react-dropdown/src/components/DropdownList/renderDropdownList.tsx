import * as React from 'react';
import { DescendantProvider, getSlots } from '@fluentui/react-utilities';
import { DropdownListState } from './DropdownList.types';
import { DropdownListProvider, dropdownDescendantContext } from '../../contexts/dropdownListContext';

/**
 * Function that renders the final JSX of the component
 */
export const renderDropdownList = (state: DropdownListState) => {
  const { slots, slotProps } = getSlots(state);
  const { activeIndex, setActiveIndex, onCheckedValueChange, checkedValues } = state;

  return (
    <DropdownListProvider
      value={{
        activeIndex,
        setActiveIndex,
        'aria-activedescendant': state['aria-activedescendant'] || '',
        onCheckedValueChange,
        checkedValues,
      }}
    >
      <slots.root {...slotProps.root}>
        <DescendantProvider context={dropdownDescendantContext} set={state.setDescendants} items={state.descendants}>
          {state.children}
        </DescendantProvider>
      </slots.root>
    </DropdownListProvider>
  );
};
