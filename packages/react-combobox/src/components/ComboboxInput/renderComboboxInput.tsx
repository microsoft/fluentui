import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ComboboxInputState, ComboboxInputSlots } from './ComboboxInput.types';

/**
 * Render the final JSX of ComboboxInput
 */
export const renderComboboxInput_unstable = (state: ComboboxInputState) => {
  const { slots, slotProps } = getSlots<ComboboxInputSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      <slots.input {...slotProps.input} />
      <slots.expandIcon {...slotProps.expandIcon} />
    </slots.root>
  );
};
