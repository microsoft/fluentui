import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { SwatchImagePickerCellSlots, SwatchImagePickerCellState } from './SwatchImagePickerCell.types';

export const swatchImagePickerCellClassNames: SlotClassNames<SwatchImagePickerCellSlots> = {
  root: 'fui-SwatchImagePickerCell',
  // TODO: add class names for all slots on SwatchImagePickerCellSlots.
  // Should be of the form `<slotName>: 'fui-SwatchImagePickerCell__<slotName>`
};

/**
 * Styles for the root slot
 */
const useStyles = makeStyles({
  root: {
    // TODO Add default styles for the root element
  },

  // TODO add additional classes for different states and/or slots
});

/**
 * Apply styling to the SwatchImagePickerCell slots based on the state
 */
export const useSwatchImagePickerCellStyles_unstable = (
  state: SwatchImagePickerCellState,
): SwatchImagePickerCellState => {
  const styles = useStyles();
  state.root.className = mergeClasses(swatchImagePickerCellClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
