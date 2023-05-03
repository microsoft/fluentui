import { useFluent_unstable } from '@fluentui/react-shared-contexts';
import { mergeClasses } from '@griffel/react';
import { DateRangeType } from '../../utils/constants';
import { getDateRangeArray } from '../../utils/index';
import { DayInfo } from './CalendarDayGrid';
import { CalendarDayGridProps } from './CalendarDayGrid.types';

/**
 * @internal
 */
export const weekCornersClassNames = {
  topRightCornerDate: 'fui-CalendarDayGrid__topRightCornerDate',
  topLeftCornerDate: 'fui-CalendarDayGrid__topLeftCornerDate',
  bottomRightCornerDate: 'fui-CalendarDayGrid__bottomRightCornerDate',
  bottomLeftCornerDate: 'fui-CalendarDayGrid__bottomLeftCornerDate',
};

/**
 * @internal
 */
export interface WeekCorners {
  [key: string]: string;
}

/**
 * @internal
 */
export function useWeekCornerStyles(props: CalendarDayGridProps) {
  const { dir } = useFluent_unstable();

  /**
   *
   * Section for setting the rounded corner styles on individual day cells. Individual day cells need different
   * corners to be rounded depending on which date range type and where the cell is located in the current grid.
   * If we just round all of the corners, there isn't a good overlap and we get gaps between contiguous day boxes
   * in Edge browser.
   *
   */
  const getWeekCornerStyles = (initialWeeks: DayInfo[][]): WeekCorners => {
    const weekCornersStyled: { [key: string]: string } = {};
    /* need to handle setting all of the corners on arbitrarily shaped blobs
          __
       __|A |
      |B |C |__
      |D |E |F |

      in this case, A needs top left rounded, top right rounded
      B needs top left rounded
      C doesn't need any rounding
      D needs bottom left rounded
      E doesn't need any rounding
      F needs top right rounding
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

        weekCornersStyled[weekIndex + '_' + dayIndex] = calculateRoundedStyles(above, below, left, right);
      });
    });

    return weekCornersStyled;
  };

  const calculateRoundedStyles = (above: boolean, below: boolean, left: boolean, right: boolean): string => {
    const style = [];
    const roundedTopLeft = !above && !left;
    const roundedTopRight = !above && !right;
    const roundedBottomLeft = !below && !left;
    const roundedBottomRight = !below && !right;

    if (roundedTopLeft) {
      style.push(dir === 'rtl' ? weekCornersClassNames.topRightCornerDate : weekCornersClassNames.topLeftCornerDate);
    }
    if (roundedTopRight) {
      style.push(dir === 'rtl' ? weekCornersClassNames.topLeftCornerDate : weekCornersClassNames.topRightCornerDate);
    }
    if (roundedBottomLeft) {
      style.push(
        dir === 'rtl' ? weekCornersClassNames.bottomRightCornerDate : weekCornersClassNames.bottomLeftCornerDate,
      );
    }
    if (roundedBottomRight) {
      style.push(
        dir === 'rtl' ? weekCornersClassNames.bottomLeftCornerDate : weekCornersClassNames.bottomRightCornerDate,
      );
    }

    return mergeClasses(...style);
  };

  const isInSameHoverRange = (date1: Date, date2: Date, date1Selected: boolean, date2Selected: boolean): boolean => {
    const { dateRangeType, firstDayOfWeek, workWeekDays } = props;

    // The hover state looks weird with non-contiguous days in work week view. In work week, show week hover state
    const dateRangeHoverType = dateRangeType === DateRangeType.WorkWeek ? DateRangeType.Week : dateRangeType;

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

  return [getWeekCornerStyles, calculateRoundedStyles] as const;
}
