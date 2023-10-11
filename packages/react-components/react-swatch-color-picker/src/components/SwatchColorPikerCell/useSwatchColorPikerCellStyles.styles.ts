import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SwatchColorPikerCellSlots, SwatchColorPikerCellState } from './SwatchColorPikerCell.types';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { tokens } from '@fluentui/react-theme';

export const swatchColorPikerCellClassNames: SlotClassNames<SwatchColorPikerCellSlots> = {
  root: 'fui-SwatchColorPikerCell',
  input: 'fui-SwatchColorPikerCell__input',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    ...shorthands.transition('transform', '.5s', 'ease-in-out'),
    '&:hover': {
      transform: 'scale(1.3)',
      ...shorthands.border('2px', 'solid', 'black'),
    },
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
  selected: {
    ...shorthands.border('2px', 'solid', 'white'),
  },
});

/**
 * Apply styling to the SwatchColorPikerCell slots based on the state
 */
export const useSwatchColorPikerCellStyles_unstable = (state: SwatchColorPikerCellState): SwatchColorPikerCellState => {
  const styles = useStyles();
  const shape = state.shape === 'circular' ? styles.circular : styles.square;
  const size = state.size || 'medium';
  const selectedStyle = state.selected ? styles.selected : '';
  state.root.className = mergeClasses(
    swatchColorPikerCellClassNames.root,
    styles.root,
    shape,
    styles[size],
    selectedStyle,
    state.root.className,
  );

  state.input.className = mergeClasses(styles.input, state.input.className);
  return state;
};
