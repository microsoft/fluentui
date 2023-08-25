import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SwatchColorPikerCellSlots, SwatchColorPikerCellState } from './SwatchColorPikerCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

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
  },
  input: {
    cursor: 'pointer',
    opacity: 0,
    width: 'inherit',
    height: 'inherit',
  },
  square: {
    ...shorthands.borderRadius(tokens.borderRadiusNone),
  },
  circular: {
    ...shorthands.borderRadius(tokens.borderRadiusCircular),
  },
  small: {
    width: '24px',
    height: '24px',
  },
  medium: {
    width: '30px',
    height: '30px',
  },
  large: {
    width: '50px',
    height: '50px',
  },
});

/**
 * Apply styling to the SwatchColorPikerCell slots based on the state
 */
export const useSwatchColorPikerCellStyles_unstable = (state: SwatchColorPikerCellState): SwatchColorPikerCellState => {
  const styles = useStyles();
  const shape = state.shape === 'circular' ? styles.circular : styles.square;
  const size = state.size || 'medium';
  state.root.className = mergeClasses(
    swatchColorPikerCellClassNames.root,
    styles.root,
    shape,
    styles[size],
    state.root.className,
  );

  state.input.className = mergeClasses(styles.input, state.input.className);
  return state;
};
