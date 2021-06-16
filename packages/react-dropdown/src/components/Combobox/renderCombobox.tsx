import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { ComboboxState } from './Combobox.types';
import { comboShorthandProps } from './useCombobox';

/**
 * Function that renders the final JSX of the component
 */
export const renderCombobox = (state: ComboboxState) => {
  const { slots, slotProps } = getSlots(state, comboShorthandProps);

  return (
    <slots.root {...slotProps.root}>
      <slots.content {...slotProps.content} />
    </slots.root>
  );
};
