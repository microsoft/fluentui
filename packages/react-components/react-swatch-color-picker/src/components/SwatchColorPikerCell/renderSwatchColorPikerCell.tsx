/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { SwatchColorPikerCellState, SwatchColorPikerCellSlots } from './SwatchColorPikerCell.types';

/**
 * Render the final JSX of SwatchColorPikerCell
 */
export const renderSwatchColorPikerCell_unstable = (state: SwatchColorPikerCellState) => {
  const { slots, slotProps } = getSlotsNext<SwatchColorPikerCellSlots>(state);
  return (
    <slots.root {...slotProps.root} style={{ background: state.color }}>
      <slots.input {...slotProps.input} />
    </slots.root>
  );
};
