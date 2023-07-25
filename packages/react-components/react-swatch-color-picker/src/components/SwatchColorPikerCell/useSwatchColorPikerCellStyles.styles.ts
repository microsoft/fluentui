import { makeStyles, mergeClasses } from '@griffel/react';
import type { SwatchColorPikerCellSlots, SwatchColorPikerCellState } from './SwatchColorPikerCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const swatchColorPikerCellClassNames: SlotClassNames<SwatchColorPikerCellSlots> = {
  root: 'fui-SwatchColorPikerCell',
  // TODO: add class names for all slots on SwatchColorPikerCellSlots.
  // Should be of the form `<slotName>: 'fui-SwatchColorPikerCell__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    width: '50px',
    height: '50px',
    cursor: 'pointer',
  },
});

/**
 * Apply styling to the SwatchColorPikerCell slots based on the state
 */
export const useSwatchColorPikerCellStyles_unstable = (state: SwatchColorPikerCellState): SwatchColorPikerCellState => {
  const styles = useStyles();
  state.root.className = mergeClasses(swatchColorPikerCellClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
