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

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
