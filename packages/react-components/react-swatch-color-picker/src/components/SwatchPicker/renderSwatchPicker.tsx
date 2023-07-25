/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { SwatchPickerState, SwatchPickerSlots } from './SwatchPicker.types';

/**
 * Render the final JSX of SwatchPicker
 */
export const renderSwatchPicker_unstable = (state: SwatchPickerState) => {
  const { slots, slotProps } = getSlotsNext<SwatchPickerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
