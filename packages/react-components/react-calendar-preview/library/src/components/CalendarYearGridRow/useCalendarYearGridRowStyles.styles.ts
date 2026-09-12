'use client';

import { mergeClasses } from '@griffel/react';
import { useCalendarItemStyles } from '../../hooks/useCalendarItemStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarYearGridRowSlots, CalendarYearGridRowState } from './CalendarYearGridRow.types';

/**
 * Class names for calendarYearGridRow slots.
 */
export const calendarYearGridRowClassNames: SlotClassNames<CalendarYearGridRowSlots> = {
  root: 'fui-CalendarYearGridRow',
  motion: 'fui-CalendarYearGridRow__motion',
};

/**
 * Apply styling to the CalendarYearGridRow slots based on the state.
 */
export const useCalendarYearGridRowStyles_unstable = (state: CalendarYearGridRowState): CalendarYearGridRowState => {
  const itemStyles = useCalendarItemStyles();

  /* eslint-disable-next-line react-hooks/immutability */
  state.root.className = mergeClasses(calendarYearGridRowClassNames.root, itemStyles.buttonRow, state.root.className);

  return state;
};
