'use client';
import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';

export const datePickerClassNames: SlotClassNames<DatePickerSlots> = {
  root: 'fui-DatePicker',
  // TODO: add class names for all slots on DatePickerSlots.
  // Should be of the form `<slotName>: 'fui-DatePicker__<slotName>`
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
 * Apply styling to the DatePicker slots based on the state
 */
export const useDatePickerStyles_unstable = (state: DatePickerState): DatePickerState => {
  const styles = useStyles();
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(datePickerClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
