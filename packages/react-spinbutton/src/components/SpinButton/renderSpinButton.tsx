import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { spinButtonShorthandProps } from './useSpinButton';
import type { SpinButtonState, SpinButtonSlots } from './SpinButton.types';

/**
 * Render the final JSX of SpinButton
 */
export const renderSpinButton = (state: SpinButtonState) => {
  const { slots, slotProps } = getSlots<SpinButtonSlots>(state, spinButtonShorthandProps);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
