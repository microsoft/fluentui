'use client';

import * as React from 'react';
import { compareDatePart, DAYS_IN_WEEK, getDayGrid } from '../utils/index';
import type { Day, DayGridOptions } from '../utils';

/**
 * A single day in the grid, augmented with the callbacks the grid needs to drive selection and
 * keep a reference to the rendered cell.
 */
export interface DayInfo extends Day {
  onSelected: (ev: React.MouseEvent<HTMLTableCellElement> | React.KeyboardEvent<HTMLElement>) => void;
  setRef(element: HTMLElement | null): void;
}

export type UseWeeksOptions = DayGridOptions & {
  /**
   * Fires when the date range changes, and returns the days in it that should be marked.
   */
  getMarkedDays?: (startingDate: Date, endingDate: Date) => Date[];
};

export function useWeeks(
  props: UseWeeksOptions,
  onSelectDate: (ev: React.MouseEvent<HTMLTableCellElement> | React.KeyboardEvent<HTMLElement>, date: Date) => void,
  getSetRefCallback: (dayKey: string) => (element: HTMLElement | null) => void,
): DayInfo[][] {
  /**
   * Initial parsing of the given props to generate IDayInfo two dimensional array, which contains a representation
   * of every day in the grid. Convenient for helping with conversions between day refs and Date objects in callbacks.
   */
  const weeks = React.useMemo((): DayInfo[][] => {
    const weeksGrid = getDayGrid(props);

    const visibleDates = weeksGrid
      .slice(1, -1)
      .flatMap(week => week.map(day => day.originalDate))
      .filter((date): date is Date => date !== null);
    const markedDays =
      visibleDates.length > 0
        ? props.getMarkedDays?.(visibleDates[0], visibleDates[visibleDates.length - 1]) || []
        : [];

    /**
     * Weeks is a 2D array. Weeks[0] contains the last week of the prior range,
     * Weeks[weeks.length - 1] contains first week of next range. These are for transition states.
     * Weeks[1... weeks.length - 2] contains the actual visible data
     */
    const returnValue: DayInfo[][] = [];

    for (let weekIndex = 0; weekIndex < weeksGrid.length; weekIndex++) {
      const week: DayInfo[] = [];
      for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
        const day = weeksGrid[weekIndex][dayIndex];
        const dayDate = day.originalDate;
        const dayInfo: DayInfo = {
          onSelected: ev => {
            if (dayDate) {
              onSelectDate(ev, dayDate);
            }
          },
          setRef: getSetRefCallback(day.key),
          ...day,
          isMarked:
            day.isMarked || (!!dayDate && markedDays?.some(markedDay => compareDatePart(dayDate, markedDay) === 0)),
        };

        week.push(dayInfo);
      }
      returnValue.push(week);
    }

    return returnValue;
  }, [getSetRefCallback, onSelectDate, props]);

  return weeks;
}
