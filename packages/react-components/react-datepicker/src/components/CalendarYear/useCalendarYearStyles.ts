import { makeStyles, mergeClasses } from '@griffel/react';
import type { CalendarYearSlots, CalendarYearState } from './CalendarYear.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const calendarYearClassNames: SlotClassNames<CalendarYearSlots> = {
  root: 'fui-CalendarYear',
  // TODO: add class names for all slots on CalendarYearSlots.
  // Should be of the form `<slotName>: 'fui-CalendarYear__<slotName>`
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
 * Apply styling to the CalendarYear slots based on the state
 */
export const useCalendarYearStyles_unstable = (state: CalendarYearState): CalendarYearState => {
  const styles = useStyles();
  state.root.className = mergeClasses(calendarYearClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
