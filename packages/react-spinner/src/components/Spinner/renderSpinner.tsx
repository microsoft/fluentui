import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SpinnerState, SpinnerSlots } from './Spinner.types';

/**
 * Render the final JSX of Spinner
 */
export const renderSpinner_unstable = (state: SpinnerState) => {
  const { slots, slotProps } = getSlots<SpinnerSlots>(state);
  const { labelPosition } = state;
  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      {slots.label && (labelPosition === 'above' || labelPosition === 'before') && <slots.label {...slotProps.label} />}
      {slots.spinner && <slots.spinner {...slotProps.spinner} />}
      {slots.label && (labelPosition === 'below' || labelPosition === 'after') && <slots.label {...slotProps.label} />}
    </slots.root>
  );
};
