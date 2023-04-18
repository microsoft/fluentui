/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { SpinnerState, SpinnerSlots } from './Spinner.types';

/**
 * Render the final JSX of Spinner
 */
export const renderSpinner_unstable = (state: SpinnerState) => {
  const { slots, slotProps } = getSlotsNext<SpinnerSlots>(state);
  const { labelPosition } = state;
  return (
    <slots.root {...slotProps.root}>
      {slots.label && (labelPosition === 'above' || labelPosition === 'before') && <slots.label {...slotProps.label} />}
      {slots.spinner && <slots.spinner {...slotProps.spinner} />}
      {slots.label && (labelPosition === 'below' || labelPosition === 'after') && <slots.label {...slotProps.label} />}
    </slots.root>
  );
};
