'use client';

import * as React from 'react';
import { useCalendarMonthGridRow_unstable } from './useCalendarMonthGridRow';
import { useCalendarMonthGridRowStyles_unstable } from './useCalendarMonthGridRowStyles.styles';
import { renderCalendarMonthGridRow_unstable } from './renderCalendarMonthGridRow';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarMonthGridRowProps } from './CalendarMonthGridRow.types';

/**
 * One row of the month picker grid, animated by the row motion the parent CalendarMonth publishes.
 */
export const CalendarMonthGridRow: ForwardRefComponent<CalendarMonthGridRowProps> = React.forwardRef((props, ref) => {
  const state = useCalendarMonthGridRow_unstable(props, ref);

  useCalendarMonthGridRowStyles_unstable(state);

  return renderCalendarMonthGridRow_unstable(state);
});

CalendarMonthGridRow.displayName = 'CalendarMonthGridRow';
