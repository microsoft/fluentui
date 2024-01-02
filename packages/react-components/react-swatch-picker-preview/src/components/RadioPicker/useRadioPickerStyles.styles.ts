import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { RadioPickerSlots, RadioPickerState } from './RadioPicker.types';

export const radioPickerClassNames: SlotClassNames<RadioPickerSlots> = {
  root: 'fui-RadioPicker',
  // TODO: add class names for all slots on RadioPickerSlots.
  // Should be of the form `<slotName>: 'fui-RadioPicker__<slotName>`
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
 * Apply styling to the RadioPicker slots based on the state
 */
export const useRadioPickerStyles_unstable = (state: RadioPickerState): RadioPickerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(radioPickerClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
