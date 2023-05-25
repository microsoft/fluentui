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
  const { labelPosition, shouldRenderSpinner } = state;
  return (
    <slots.root {...slotProps.root}>
      {slots.label && shouldRenderSpinner && (labelPosition === 'above' || labelPosition === 'before') && (
        <slots.label {...slotProps.label} />
      )}
      {slots.spinner && shouldRenderSpinner && <slots.spinner {...slotProps.spinner} />}
      {slots.label && shouldRenderSpinner && (labelPosition === 'below' || labelPosition === 'after') && (
        <slots.label {...slotProps.label} />
      )}
    </slots.root>
  );
};
