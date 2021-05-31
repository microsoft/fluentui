import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { DropdownTriggerState } from './DropdownTrigger.types';
import { dropdownTriggerShorthandProps } from './useDropdownTrigger';

/**
 * Function that renders the final JSX of the component
 */
export const renderDropdownTrigger = (state: DropdownTriggerState) => {
  const { slots, slotProps } = getSlots(state, dropdownTriggerShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.content {...slotProps.content} />
    </slots.root>
  );
};
