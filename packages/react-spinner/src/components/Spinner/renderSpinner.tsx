import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { SpinnerSlots, SpinnerRender } from './Spinner.types';

/**
 * Render the final JSX of Spinner
 */
export const renderSpinner_unstable: SpinnerRender = state => {
  const { slots, slotProps } = getSlots<SpinnerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
