'use client';

import * as React from 'react';
import { useCalendarDayGridRow_unstable } from './useCalendarDayGridRow';
import { useCalendarDayGridRowStyles_unstable } from './useCalendarDayGridRowStyles.styles';
import { renderCalendarDayGridRow_unstable } from './renderCalendarDayGridRow';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarDayGridRowProps } from './CalendarDayGridRow.types';

/**
 * One week of the day grid, animated by the row motion the parent CalendarDayGrid publishes.
 */
export const CalendarDayGridRow: ForwardRefComponent<CalendarDayGridRowProps> = React.forwardRef((props, ref) => {
  const state = useCalendarDayGridRow_unstable(props, ref);

  useCalendarDayGridRowStyles_unstable(state);

  return renderCalendarDayGridRow_unstable(state);
});

CalendarDayGridRow.displayName = 'CalendarDayGridRow';
