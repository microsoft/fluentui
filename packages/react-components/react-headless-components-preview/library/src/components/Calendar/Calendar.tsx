'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCalendar, useCalendarContextValues } from './useCalendar';
import { renderCalendar } from './renderCalendar';
import type { CalendarProps } from './Calendar.types';

/**
 * Calendar shows a date grid and lets the user pick a date, a week, a work week or a month.
 */
export const Calendar: ForwardRefComponent<CalendarProps> = React.forwardRef((props, ref) => {
  const state = useCalendar(props, ref);

  const contextValues = useCalendarContextValues(state);

  return renderCalendar(state, contextValues);
});

Calendar.displayName = 'Calendar';
