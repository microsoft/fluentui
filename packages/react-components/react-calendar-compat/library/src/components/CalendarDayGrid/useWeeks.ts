import * as React from 'react';
import { compareDates, DAYS_IN_WEEK, getDayGrid } from '../../utils/index';
import { DayInfo } from './CalendarDayGrid';
import { CalendarDayGridProps } from './CalendarDayGrid.types';

/**
 * @internal
 */
export function useWeeks(
  props: CalendarDayGridProps,
  onSelectDate: (date: Date) => void,
  getSetRefCallback: (dayKey: string) => (element: HTMLElement | null) => void,
): DayInfo[][] {
  'use no memo';

  /**
   * Initial parsing of the given props to generate IDayInfo two dimensional array, which contains a representation
   * of every day in the grid. Convenient for helping with conversions between day refs and Date objects in callbacks.
   */
  const weeks = React.useMemo((): DayInfo[][] => {
    const weeksGrid = getDayGrid(props);

    const firstVisibleDay = weeksGrid[1][0].originalDate;
    const lastVisibleDay = weeksGrid[weeksGrid.length - 1][6].originalDate;
    const markedDays = props.getMarkedDays?.(firstVisibleDay, lastVisibleDay) || [];

    /**
     * Weeks is a 2D array. Weeks[0] contains the last week of the prior range,
     * Weeks[weeks.length - 1] contains first week of next range. These are for transition states.
     *
     * Weeks[1... weeks.length - 2] contains the actual visible data
     */
    const returnValue: DayInfo[][] = [];

    for (let weekIndex = 0; weekIndex < weeksGrid.length; weekIndex++) {
      const week: DayInfo[] = [];
      for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
        const day = weeksGrid[weekIndex][dayIndex];
        const dayInfo: DayInfo = {
          onSelected: () => onSelectDate(day.originalDate),
          setRef: getSetRefCallback(day.key),
          ...day,
          isMarked: day.isMarked || markedDays?.some(markedDay => compareDates(day.originalDate, markedDay)),
        };

        week.push(dayInfo);
      }
      returnValue.push(week);
    }

    return returnValue;
    // TODO: this is missing deps on getSetRefCallback and onSelectDate (and depending on the entire
    // props object may not be a good idea due to likely frequent mutation). It would be easy to
    // fix getSetRefCallback to not mutate every render, but onSelectDate is passed down from
    // Calendar and trying to fix it requires a huge cascade of changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return weeks;
}
