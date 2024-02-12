import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { PickerButtonSlots, PickerButtonState } from './PickerButton.types';

export const pickerButtonClassNames: SlotClassNames<PickerButtonSlots> = {
  root: 'fui-PickerButton',
  // TODO: add class names for all slots on PickerButtonSlots.
  // Should be of the form `<slotName>: 'fui-PickerButton__<slotName>`
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
 * Apply styling to the PickerButton slots based on the state
 */
export const usePickerButtonStyles_unstable = (state: PickerButtonState): PickerButtonState => {
  const styles = useStyles();
  state.root.className = mergeClasses(pickerButtonClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
