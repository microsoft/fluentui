'use client';

import * as React from 'react';
import type { CalendarState, CalendarContextValue, CalendarContextValues } from './Calendar.types';

/**
 * Creates state for the CalendarContextValues component.
 */
export function useCalendarContextValues(state: CalendarState): CalendarContextValues {
  const {
    allFocusable,
    dateRangeType,
    firstDayOfWeek,
    firstWeekOfYear,
    formatters,
    highlightCurrent,
    highlightSelected,
    maxDate,
    minDate,
    restrictedDates,
    setValue,
    showWeekNumbers,
    today,
    value,
    workWeekDays,
  } = state;

  const calendar = React.useMemo<CalendarContextValue>(
    () => ({
      allFocusable,
      dateRangeType,
      firstDayOfWeek,
      firstWeekOfYear,
      formatters,
      highlightCurrent,
      highlightSelected,
      maxDate,
      minDate,
      restrictedDates,
      setValue,
      showWeekNumbers,
      today,
      value,
      workWeekDays,
    }),
    [
      allFocusable,
      dateRangeType,
      firstDayOfWeek,
      firstWeekOfYear,
      formatters,
      highlightCurrent,
      highlightSelected,
      maxDate,
      minDate,
      restrictedDates,
      setValue,
      showWeekNumbers,
      today,
      value,
      workWeekDays,
    ],
  );

  return { calendar };
}
