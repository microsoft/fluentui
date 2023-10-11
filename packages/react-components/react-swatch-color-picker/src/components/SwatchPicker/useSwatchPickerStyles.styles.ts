import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchPickerSlots, SwatchPickerState } from './SwatchPicker.types';
import { swatchColorPikerCellClassNames } from '../SwatchColorPikerCell/useSwatchColorPikerCellStyles.styles';

export const swatchPickerClassNames: SlotClassNames<SwatchPickerSlots> = {
  root: 'fui-SwatchPicker',
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    // [`& > .${swatchColorPikerCellClassNames.root}`]: {
    //   opacity: 0.7,
    // },
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: '2px',
  },
  grid: {
    display: 'grid',
    // gridTemplateColumns: `repeat(3, 30px)`,
    gridTemplateColumns: `repeat(auto-fit, 30px)`,
    columnGap: '2px',
    rowGap: '2px',
  },
});

/**
 * Apply styling to the SwatchPicker slots based on the state
 */
export const useSwatchPickerStyles_unstable = (state: SwatchPickerState): SwatchPickerState => {
  const styles = useStyles();
  const layout = state.layout === 'row' ? styles.row : styles.grid;
  state.root.className = mergeClasses(swatchPickerClassNames.root, styles.root, layout, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
