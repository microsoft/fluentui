'use client';

import * as React from 'react';
import { useCalendarDayGridRow } from './useCalendarDayGridRow';
import { renderCalendarDayGridRow } from './renderCalendarDayGridRow';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarDayGridRowProps } from './CalendarDayGridRow.types';

/**
 * CalendarDayGridRow renders one week of the day grid.
 */
export const CalendarDayGridRow: ForwardRefComponent<CalendarDayGridRowProps> = React.forwardRef((props, ref) => {
  const state = useCalendarDayGridRow(props, ref);

  return renderCalendarDayGridRow(state);
});

CalendarDayGridRow.displayName = 'CalendarDayGridRow';
