'use client';

import * as React from 'react';
import { useCalendarMonth_unstable } from './useCalendarMonth';
import { useCalendarMonthContextValues_unstable } from './useCalendarMonthContextValues';
import { useCalendarMonthStyles_unstable } from './useCalendarMonthStyles.styles';
import { renderCalendarMonth_unstable } from './renderCalendarMonth';
import type { CalendarMonthHandle, CalendarMonthProps } from './CalendarMonth.types';

/**
 * The month picker: a year header with navigation controls above a grid of months. Swaps itself
 * for CalendarYear while the year picker is open.
 */
export const CalendarMonth = React.forwardRef<CalendarMonthHandle, CalendarMonthProps>((props, ref) => {
  const state = useCalendarMonth_unstable(props, ref);
  const contextValues = useCalendarMonthContextValues_unstable(state);

  useCalendarMonthStyles_unstable(state);

  return renderCalendarMonth_unstable(state, contextValues);
});

CalendarMonth.displayName = 'CalendarMonth';
