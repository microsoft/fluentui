import { makeStyles, mergeClasses } from '@griffel/react';
import type { CalendarDaySlots, CalendarDayState } from './CalendarDay.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const calendarDayClassNames: SlotClassNames<CalendarDaySlots> = {
  root: 'fui-CalendarDay',
  // TODO: add class names for all slots on CalendarDaySlots.
  // Should be of the form `<slotName>: 'fui-CalendarDay__<slotName>`
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
 * Apply styling to the CalendarDay slots based on the state
 */
export const useCalendarDayStyles_unstable = (state: CalendarDayState): CalendarDayState => {
  const styles = useStyles();
  state.root.className = mergeClasses(calendarDayClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
