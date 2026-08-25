import type { CalendarYearBaseState, CalendarYearContextValues } from './CalendarYear.types';

/**
 * Not memoized: the year cells are rebuilt on every render, so a memo would capture stale closures
 * without preventing any re-render.
 */
export function useCalendarYearContextValues_unstable(state: CalendarYearBaseState): CalendarYearContextValues {
  const { fromYear, currentYearRef, onSelectYear, selectedYearRef, yearRows } = state;

  return {
    calendarYear: {
      currentYearRef,
      onSelectYear,
      selectedYearRef,
      yearRows,
      fromYear,
    },
  };
}
