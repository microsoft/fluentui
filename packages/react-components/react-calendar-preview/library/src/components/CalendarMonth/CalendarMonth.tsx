'use client';

import * as React from 'react';
import { useCalendarMonth_unstable } from './useCalendarMonth';
import { useCalendarMonthStyles_unstable } from './useCalendarMonthStyles.styles';
import { renderCalendarMonth_unstable } from './renderCalendarMonth';
import type { CalendarMonthHandle, CalendarMonthProps } from './CalendarMonth.types';

/**
 * The month picker: a year header with navigation controls above a grid of months. Selecting the
 * header opens an embedded year picker.
 */
export const CalendarMonth = React.forwardRef<CalendarMonthHandle, CalendarMonthProps>((props, ref) => {
  const state = useCalendarMonth_unstable(props, ref);

  useCalendarMonthStyles_unstable(state);

  return renderCalendarMonth_unstable(state);
});

CalendarMonth.displayName = 'CalendarMonth';
