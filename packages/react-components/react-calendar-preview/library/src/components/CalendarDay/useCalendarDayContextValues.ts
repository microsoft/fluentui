import type { CalendarDayBaseState, CalendarDayContextValues } from './CalendarDay.types';

/**
 * Not memoized: the day picker rebuilds `weeks` and the range helpers on every render, so a memo
 * would capture stale closures without preventing any re-render.
 */
export function useCalendarDayContextValues_unstable(state: CalendarDayBaseState): CalendarDayContextValues {
  const {
    activeDescendantId,
    calculateRoundedCorners,
    daysToSelectInDayView,
    getDayInfosInRangeOfDay,
    getRefsFromDayInfos,
    lightenDaysOutsideNavigatedMonth,
    navigatedDate,
    navigatedDayRef,
    onNavigateDate,
    weekCorners,
    weeks,
    weeksToShow,
  } = state;

  return {
    calendarDay: {
      activeDescendantId,
      calculateRoundedCorners,
      daysToSelectInDayView,
      getDayInfosInRangeOfDay,
      getRefsFromDayInfos,
      lightenDaysOutsideNavigatedMonth,
      navigatedDate,
      navigatedDayRef,
      onNavigateDate,
      weekCorners,
      weeks,
      weeksToShow,
    },
  };
}
