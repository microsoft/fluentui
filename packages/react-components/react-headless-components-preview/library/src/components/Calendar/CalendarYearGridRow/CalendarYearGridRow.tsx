'use client';

import * as React from 'react';
import { useCalendarYearGridRow } from './useCalendarYearGridRow';
import { renderCalendarYearGridRow } from './renderCalendarYearGridRow';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarYearGridRowProps } from './CalendarYearGridRow.types';

/**
 * CalendarYearGridRow renders one row of the year picker grid.
 */
export const CalendarYearGridRow: ForwardRefComponent<CalendarYearGridRowProps> = React.forwardRef((props, ref) => {
  const state = useCalendarYearGridRow(props, ref);

  return renderCalendarYearGridRow(state);
});

CalendarYearGridRow.displayName = 'CalendarYearGridRow';
