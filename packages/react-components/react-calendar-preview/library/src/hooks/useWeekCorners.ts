'use client';

import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { getDateRangeArray } from '../utils/index';
import type { DayGridOptions } from '../utils';
import type { DayInfo } from './useWeeks';

/**
 * Which corners of a day cell sit on the outer edge of its range.
 */
export interface DayCorners {
  topLeft: boolean;
  topRight: boolean;
  bottomLeft: boolean;
  bottomRight: boolean;
}

/**
 * Corners for every day in the grid, keyed by `weekIndex_dayIndex`.
 */
export interface WeekCorners {
  [key: string]: DayCorners;
}

export function useWeekCorners(
  props: DayGridOptions,
): readonly [
  (initialWeeks: DayInfo[][]) => WeekCorners,
  (above: boolean, below: boolean, left: boolean, right: boolean) => DayCorners,
] {
  const { dir } = useFluent_unstable();

  /**
   * Section for setting the rounded corners on individual day cells. Individual day cells need different
   * corners to be rounded depending on which date range type and where the cell is located in the current grid.
   * If we just round all of the corners, there isn't a good overlap and we get gaps between contiguous day boxes
   * in Edge browser.
   */
  const getWeekCorners = (initialWeeks: DayInfo[][]): WeekCorners => {
    const weekCorners: WeekCorners = {};
    /*
     * need to handle setting all of the corners on arbitrarily shaped blobs
     *    __
     * __|A |
     * |B |C |__
     * |D |E |F |
     *
     * in this case, A needs top left rounded, top right rounded
     * B needs top left rounded
     * C doesn't need any rounding
     * D needs bottom left rounded
     * E doesn't need any rounding
     * F needs top right rounding
     */

    // cut off the animation transition weeks
    const weeks = initialWeeks.slice(1, initialWeeks.length - 1);

    // if there's an item above, lose both top corners. Item below, lose both bottom corners, etc.
    weeks.forEach((week: DayInfo[], weekIndex: number) => {
      week.forEach((day: DayInfo, dayIndex: number) => {
        const above =
          weeks[weekIndex - 1] &&
          weeks[weekIndex - 1][dayIndex] &&
          isInSameHoverRange(
            weeks[weekIndex - 1][dayIndex].originalDate,
            day.originalDate,
            weeks[weekIndex - 1][dayIndex].isSelected,
            day.isSelected,
          );
        const below =
          weeks[weekIndex + 1] &&
          weeks[weekIndex + 1][dayIndex] &&
          isInSameHoverRange(
            weeks[weekIndex + 1][dayIndex].originalDate,
            day.originalDate,
            weeks[weekIndex + 1][dayIndex].isSelected,
            day.isSelected,
          );
        const left =
          weeks[weekIndex][dayIndex - 1] &&
          isInSameHoverRange(
            weeks[weekIndex][dayIndex - 1].originalDate,
            day.originalDate,
            weeks[weekIndex][dayIndex - 1].isSelected,
            day.isSelected,
          );
        const right =
          weeks[weekIndex][dayIndex + 1] &&
          isInSameHoverRange(
            weeks[weekIndex][dayIndex + 1].originalDate,
            day.originalDate,
            weeks[weekIndex][dayIndex + 1].isSelected,
            day.isSelected,
          );

        weekCorners[weekIndex + '_' + dayIndex] = calculateRoundedCorners(above, below, left, right);
      });
    });

    return weekCorners;
  };

  const calculateRoundedCorners = (above: boolean, below: boolean, left: boolean, right: boolean): DayCorners => {
    const roundedStartTop = !above && !left;
    const roundedEndTop = !above && !right;
    const roundedStartBottom = !below && !left;
    const roundedEndBottom = !below && !right;
    const rtl = dir === 'rtl';

    return {
      topLeft: rtl ? roundedEndTop : roundedStartTop,
      topRight: rtl ? roundedStartTop : roundedEndTop,
      bottomLeft: rtl ? roundedEndBottom : roundedStartBottom,
      bottomRight: rtl ? roundedStartBottom : roundedEndBottom,
    };
  };

  const isInSameHoverRange = (date1: Date, date2: Date, date1Selected: boolean, date2Selected: boolean): boolean => {
    const { dateRangeType, firstDayOfWeek, workWeekDays } = props;

    // The hover state looks weird with non-contiguous days in work week view. In work week, show week hover state
    const dateRangeHoverType = dateRangeType === 'workWeek' ? 'week' : dateRangeType;

    // we do not pass daysToSelectInDayView because we handle setting those styles dyanamically in onMouseOver
    const dateRange = getDateRangeArray(date1, dateRangeHoverType, firstDayOfWeek, workWeekDays);

    if (date1Selected !== date2Selected) {
      // if one is selected and the other is not, they can't be in the same range
      return false;
    } else if (date1Selected && date2Selected) {
      // if they're both selected at the same time they must be in the same range
      return true;
    }

    // otherwise, both must be unselected, so check the dateRange
    return dateRange.filter((date: Date) => date.getTime() === date2.getTime()).length > 0;
  };

  return [getWeekCorners, calculateRoundedCorners] as const;
}
