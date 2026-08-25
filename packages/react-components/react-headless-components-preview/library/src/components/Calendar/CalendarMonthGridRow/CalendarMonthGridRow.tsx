'use client';

import * as React from 'react';
import { useCalendarMonthGridRow } from './useCalendarMonthGridRow';
import { renderCalendarMonthGridRow } from './renderCalendarMonthGridRow';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarMonthGridRowProps } from './CalendarMonthGridRow.types';

/**
 * CalendarMonthGridRow renders one row of the month picker grid.
 */
export const CalendarMonthGridRow: ForwardRefComponent<CalendarMonthGridRowProps> = React.forwardRef((props, ref) => {
  const state = useCalendarMonthGridRow(props, ref);

  return renderCalendarMonthGridRow(state);
});

CalendarMonthGridRow.displayName = 'CalendarMonthGridRow';
