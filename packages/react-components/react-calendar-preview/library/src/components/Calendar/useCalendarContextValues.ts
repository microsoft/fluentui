'use client';

import * as React from 'react';
import type { CalendarBaseState, CalendarContextValue, CalendarContextValues } from './Calendar.types';

/**
 * Creates state for the CalendarContextValues component.
 */

export function useCalendarContextValues_unstable(state: CalendarBaseState): CalendarContextValues {
  const {
    allFocusable,
    dateRangeType,
    firstDayOfWeek,
    firstWeekOfYear,
    formatDateTime,
    formatLabel,
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
      formatDateTime,
      formatLabel,
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
      formatDateTime,
      formatLabel,
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
