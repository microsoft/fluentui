/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { SwatchImagePickerCellState, SwatchImagePickerCellSlots } from './SwatchImagePickerCell.types';

/**
 * Render the final JSX of SwatchImagePickerCell
 */
export const renderSwatchImagePickerCell_unstable = (state: SwatchImagePickerCellState) => {
  const { slots, slotProps } = getSlotsNext<SwatchImagePickerCellSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
