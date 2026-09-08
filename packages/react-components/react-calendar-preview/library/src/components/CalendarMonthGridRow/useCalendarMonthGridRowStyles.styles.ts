'use client';

import { mergeClasses } from '@griffel/react';
import { useCalendarItemStyles } from '../../hooks/useCalendarItemStyles.styles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarMonthGridRowSlots, CalendarMonthGridRowState } from './CalendarMonthGridRow.types';

/**
 * Class names for calendarMonthGridRow slots.
 */
export const calendarMonthGridRowClassNames: SlotClassNames<CalendarMonthGridRowSlots> = {
  root: 'fui-CalendarMonthGridRow',
  motion: 'fui-CalendarMonthGridRow__motion',
};

/**
 * Apply styling to the CalendarMonthGridRow slots based on the state.
 */
export const useCalendarMonthGridRowStyles_unstable = (state: CalendarMonthGridRowState): CalendarMonthGridRowState => {
  const itemStyles = useCalendarItemStyles();

  /* eslint-disable react-hooks/immutability */
  state.root.className = mergeClasses(calendarMonthGridRowClassNames.root, itemStyles.buttonRow, state.root.className);
  /* eslint-enable react-hooks/immutability */
  return state;
};
