'use client';

import * as React from 'react';
import { useCalendarYear_unstable } from './useCalendarYear';
import { useCalendarYearContextValues_unstable } from './useCalendarYearContextValues';
import { useCalendarYearStyles_unstable } from './useCalendarYearStyles.styles';
import { renderCalendarYear_unstable } from './renderCalendarYear';
import type { CalendarYearHandle, CalendarYearProps } from './CalendarYear.types';

/**
 * The year picker: a year-range header with navigation controls above a grid of years.
 */
export const CalendarYear = React.forwardRef<CalendarYearHandle, CalendarYearProps>((props, ref) => {
  const state = useCalendarYear_unstable(props, ref);
  const contextValues = useCalendarYearContextValues_unstable(state);

  useCalendarYearStyles_unstable(state);

  return renderCalendarYear_unstable(state, contextValues);
});

CalendarYear.displayName = 'CalendarYear';
