import type { CalendarMonthBaseState, CalendarMonthContextValues } from './CalendarMonth.types';

/**
 * Not memoized: the month cells are rebuilt on every render, so a memo would capture stale
 * closures without preventing any re-render.
 */
export function useCalendarMonthContextValues_unstable(state: CalendarMonthBaseState): CalendarMonthContextValues {
  const { monthRows, navigatedMonthRef, navigatedYear } = state;

  return {
    calendarMonth: {
      monthRows,
      navigatedMonthRef,
      navigatedYear,
    },
  };
}
