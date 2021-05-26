import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { DropdownOptionState } from './DropdownOption.types';
import { dropdownOptionShorthandProps } from './useDropdownOption';

/**
 * Function that renders the final JSX of the component
 */
export const renderDropdownOption = (state: DropdownOptionState) => {
  const { slots, slotProps } = getSlots(state, dropdownOptionShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.content {...slotProps.content} />
    </slots.root>
  );
};
