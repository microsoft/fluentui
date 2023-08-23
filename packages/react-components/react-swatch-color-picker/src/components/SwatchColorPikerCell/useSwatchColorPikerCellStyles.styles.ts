import { makeStyles, mergeClasses } from '@griffel/react';
import type { SwatchColorPikerCellSlots, SwatchColorPikerCellState } from './SwatchColorPikerCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const swatchColorPikerCellClassNames: SlotClassNames<SwatchColorPikerCellSlots> = {
  root: 'fui-SwatchColorPikerCell',
  input: 'fui-SwatchColorPikerCell__input',
  // TODO: add class names for all slots on SwatchColorPikerCellSlots.
  // Should be of the form `<slotName>: 'fui-SwatchColorPikerCell__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '50px',
  },
  input: {
    cursor: 'pointer',
    opacity: 0,
    width: 'inherit',
    height: 'inherit',
  },
});

/**
 * Apply styling to the SwatchColorPikerCell slots based on the state
 */
export const useSwatchColorPikerCellStyles_unstable = (state: SwatchColorPikerCellState): SwatchColorPikerCellState => {
  const styles = useStyles();
  state.root.className = mergeClasses(swatchColorPikerCellClassNames.root, styles.root, state.root.className);

  state.input.className = mergeClasses(styles.input, state.input.className);
  return state;
};
