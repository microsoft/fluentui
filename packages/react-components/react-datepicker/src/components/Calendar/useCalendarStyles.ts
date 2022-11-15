import { makeStyles, mergeClasses } from '@griffel/react';
import type { CalendarSlots, CalendarState } from './Calendar.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const calendarClassNames: SlotClassNames<CalendarSlots> = {
  root: 'fui-Calendar',
  // TODO: add class names for all slots on CalendarSlots.
  // Should be of the form `<slotName>: 'fui-Calendar__<slotName>`
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
 * Apply styling to the Calendar slots based on the state
 */
export const useCalendarStyles_unstable = (state: CalendarState): CalendarState => {
  const styles = useStyles();
  state.root.className = mergeClasses(calendarClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
