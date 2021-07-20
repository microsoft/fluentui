import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { DropdownListSlots, DropdownListState } from './DropdownList.types';

/**
 * Function that renders the final JSX of the component
 */
export const renderDropdownList = (state: DropdownListState) => {
  const { slots, slotProps } = getSlots<DropdownListSlots>(state, ['option']);
  const { options, resolveOptionProps } = state;

  return (
    <slots.root {...slotProps.root}>
      {options.map((option, i) => {
        return <slots.option key={`option-${i}`} {...slotProps.option} {...resolveOptionProps(option, i)} />;
      })}
    </slots.root>
  );
};
