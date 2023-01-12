import { makeStyles, mergeClasses } from '@griffel/react';
import type { CalendarGridSlots, CalendarGridState } from './CalendarGrid.types';
import type { SlotClassNames } from '@fluentui/react-utilities';

export const calendarGridClassNames: SlotClassNames<CalendarGridSlots> = {
  root: 'fui-CalendarGrid',
  // TODO: add class names for all slots on CalendarGridSlots.
  // Should be of the form `<slotName>: 'fui-CalendarGrid__<slotName>`
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
 * Apply styling to the CalendarGrid slots based on the state
 */
export const useCalendarGridStyles_unstable = (state: CalendarGridState): CalendarGridState => {
  const styles = useStyles();
  state.root.className = mergeClasses(calendarGridClassNames.root, styles.root, state.root.className);

  // TODO Add class names to slots, for example:
  // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

  return state;
};
