'use client';

import * as React from 'react';
import { useCalendarYearGridRow_unstable } from './useCalendarYearGridRow';
import { useCalendarYearGridRowStyles_unstable } from './useCalendarYearGridRowStyles.styles';
import { renderCalendarYearGridRow_unstable } from './renderCalendarYearGridRow';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarYearGridRowProps } from './CalendarYearGridRow.types';

/**
 * One row of the year picker grid, animated by the row motion the parent CalendarYear publishes.
 */
export const CalendarYearGridRow: ForwardRefComponent<CalendarYearGridRowProps> = React.forwardRef((props, ref) => {
  const state = useCalendarYearGridRow_unstable(props, ref);

  useCalendarYearGridRowStyles_unstable(state);

  return renderCalendarYearGridRow_unstable(state);
});

CalendarYearGridRow.displayName = 'CalendarYearGridRow';
