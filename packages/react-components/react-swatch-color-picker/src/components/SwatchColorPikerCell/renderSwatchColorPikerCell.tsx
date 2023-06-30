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
  const { svg } = slotProps.svg;

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      <slots.svg {...slotProps.svg} role="img" viewBox="0 0 20 20" fill={svg.color ?? 'yellow'} focusable="false">
        <circle cx="50%" cy="50%" r="50%"></circle>
      </slots.svg>
    </slots.root>
  );
};
