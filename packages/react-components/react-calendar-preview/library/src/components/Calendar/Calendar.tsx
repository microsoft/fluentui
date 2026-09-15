'use client';

import * as React from 'react';
import { useCalendar_unstable } from './useCalendar';
import { useCalendarContextValues_unstable } from './useCalendarContextValues';
import { useCalendarStyles_unstable } from './useCalendarStyles.styles';
import { renderCalendar_unstable } from './renderCalendar';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CalendarProps } from './Calendar.types';

/**
 * Calendar shows a date grid and lets the user pick a date, a week, a work week, or a month.
 */
export const Calendar: ForwardRefComponent<CalendarProps> = React.forwardRef((props, ref) => {
  const state = useCalendar_unstable(props, ref);

  const contextValues = useCalendarContextValues_unstable(state);

  useCalendarStyles_unstable(state);

  return renderCalendar_unstable(state, contextValues);
});

Calendar.displayName = 'Calendar';
