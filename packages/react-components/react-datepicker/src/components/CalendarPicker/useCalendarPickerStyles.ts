import { makeStyles, mergeClasses } from '@griffel/react';
import type { CalendarPickerSlots, CalendarPickerState } from './CalendarPicker.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const calendarPickerClassNames: SlotClassNames<CalendarPickerSlots> = {
  root: 'fui-CalendarPicker',
  // TODO: add class names for all slots on CalendarPickerSlots.
  // Should be of the form `<slotName>: 'fui-CalendarPicker__<slotName>`
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
 * Apply styling to the CalendarPicker slots based on the state
 */
export const useCalendarPickerStyles_unstable = (state: CalendarPickerState): CalendarPickerState => {
  const styles = useStyles();
  state.root.className = mergeClasses(calendarPickerClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
