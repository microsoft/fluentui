'use client';

import * as React from 'react';
import { useCalendarDay_unstable } from './useCalendarDay';
import { useCalendarDayContextValues_unstable } from './useCalendarDayContextValues';
import { useCalendarDayStyles_unstable } from './useCalendarDayStyles.styles';
import { renderCalendarDay_unstable } from './renderCalendarDay';
import type { CalendarDayHandle, CalendarDayProps } from './CalendarDay.types';

/**
 * The day picker: a month/year header with navigation controls above the grid of that month's
 * days, including the weekday header row and the leading and trailing transition weeks used by the
 * navigation motion.
 */
export const CalendarDay = React.forwardRef<CalendarDayHandle, CalendarDayProps>((props, ref) => {
  const state = useCalendarDay_unstable(props, ref);
  const contextValues = useCalendarDayContextValues_unstable(state);

  useCalendarDayStyles_unstable(state);

  return renderCalendarDay_unstable(state, contextValues);
});

CalendarDay.displayName = 'CalendarDay';
