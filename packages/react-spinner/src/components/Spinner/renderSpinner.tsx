import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { spinnerShorthandProps } from './useSpinner';
import type { SpinnerState, SpinnerSlots } from './Spinner.types';

/**
 * Render the final JSX of Spinner
 */
export const renderSpinner = (state: SpinnerState) => {
  const { slots, slotProps } = getSlots<SpinnerSlots>(state, spinnerShorthandProps);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
