import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchPickerSlots, SwatchPickerState } from './SwatchPicker.types';

export const swatchPickerClassNames: SlotClassNames<SwatchPickerSlots> = {
  root: 'fui-SwatchPicker',
  // TODO: add class names for all slots on SwatchPickerSlots.
  // Should be of the form `<slotName>: 'fui-SwatchPicker__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {},
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '50px 50px 50px',
    gridTemplateRows: '50px 50px 50px',
    columnGap: '10px',
    rowGap: '10px',
  },

  // TODO add additional classes for different states and/or slots
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
