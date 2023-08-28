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

  return (
    <slots.root {...slotProps.root} style={{ backgroundImage: `url(${state.uri})` }}>
      <slots.input {...slotProps.input} />
    </slots.root>
  );
};
