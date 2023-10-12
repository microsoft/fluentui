import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TimePickerSlots, TimePickerState } from './TimePicker.types';

export const timePickerClassNames: SlotClassNames<TimePickerSlots> = {
  root: 'fui-TimePicker',
  // TODO: add class names for all slots on TimePickerSlots.
  // Should be of the form `<slotName>: 'fui-TimePicker__<slotName>`
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
 * Apply styling to the TimePicker slots based on the state
 */
export const useTimePickerStyles_unstable = (state: TimePickerState): TimePickerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(timePickerClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
