import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchImagePickerCellSlots, SwatchImagePickerCellState } from './SwatchImagePickerCell.types';
import { tokens } from '@fluentui/react-theme';

export const swatchImagePickerCellClassNames: SlotClassNames<SwatchImagePickerCellSlots> = {
  root: 'fui-SwatchImagePickerCell',
  input: 'fui-SwatchImagePickerCell__input',
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
    backgroundSize: 'contain',
    '&:hover': {
      ...shorthands.border('2px', 'solid', tokens.colorBrandForeground1),
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
});

/**
 * Apply styling to the SwatchImagePickerCell slots based on the state
 */
export const useSwatchImagePickerCellStyles_unstable = (
  state: SwatchImagePickerCellState,
): SwatchImagePickerCellState => {
  const styles = useStyles();
  const shape = state.shape === 'circular' ? styles.circular : styles.square;
  const size = state.size || 'medium';
  state.root.className = mergeClasses(
    swatchImagePickerCellClassNames.root,
    styles.root,
    shape,
    styles[size],
    state.root.className,
  );

  state.input.className = mergeClasses(styles.input, state.input.className);

  return state;
};
