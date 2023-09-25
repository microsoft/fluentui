import * as React from 'react';
import { getRTL, classNamesFunction } from '@fluentui/utilities';
import { FocusZone } from '../../FocusZone';
import {
  getDateRangeArray,
  getDayGrid,
  getBoundedDateRange,
  isRestrictedDate,
  DAYS_IN_WEEK,
  compareDates,
  DateRangeType,
  DayOfWeek,
} from '@fluentui/date-time-utilities';
import { usePrevious, useId } from '@fluentui/react-hooks';
import { CalendarMonthHeaderRow } from './CalendarMonthHeaderRow';
import { CalendarGridRow } from './CalendarGridRow';
import type { IDay } from '@fluentui/date-time-utilities';
import type {
  ICalendarDayGridProps,
  ICalendarDayGridStyleProps,
  ICalendarDayGridStyles,
} from './CalendarDayGrid.types';
import type { IProcessedStyleSet } from '@fluentui/style-utilities';

const getClassNames = classNamesFunction<ICalendarDayGridStyleProps, ICalendarDayGridStyles>();

export interface IWeekCorners {
  [key: string]: string;
}

export interface IDayInfo extends IDay {
  onSelected: () => void;
  setRef(element: HTMLElement | null): void;
}

function useDayRefs() {
  const daysRef = React.useRef<Record<string, HTMLElement>>({});

  const getSetRefCallback = (dayKey: string) => (element: HTMLElement | null) => {
    if (element === null) {
      delete daysRef.current[dayKey];
    } else {
      daysRef.current[dayKey] = element;
    }
  };

  return [daysRef, getSetRefCallback] as const;
}

function useWeeks(
  props: ICalendarDayGridProps,
  onSelectDate: (date: Date) => void,
  getSetRefCallback: (dayKey: string) => (element: HTMLElement | null) => void,
): IDayInfo[][] {
  /**
   * Initial parsing of the given props to generate IDayInfo two dimensional array, which contains a representation
   * of every day in the grid. Convenient for helping with conversions between day refs and Date objects in callbacks.
   */
  const weeks = React.useMemo((): IDayInfo[][] => {
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
    const returnValue: IDayInfo[][] = [];

    for (let weekIndex = 0; weekIndex < weeksGrid.length; weekIndex++) {
      const week: IDayInfo[] = [];
      for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
        const day = weeksGrid[weekIndex][dayIndex];
        const dayInfo: IDayInfo = {
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

/**
 * Hook to determine whether to animate the CalendarDayGrid forwards or backwards
 * @returns true if the grid should animate backwards; false otherwise
 */
function useAnimateBackwards(weeks: IDayInfo[][]): boolean | undefined {
  const previousNavigatedDate = usePrevious(weeks[0][0].originalDate);

  if (!previousNavigatedDate || previousNavigatedDate.getTime() === weeks[0][0].originalDate.getTime()) {
    return undefined;
  } else if (previousNavigatedDate <= weeks[0][0].originalDate) {
    return false;
  } else {
    return true;
  }
}

function useWeekCornerStyles(props: ICalendarDayGridProps) {
  /**
   *
   * Section for setting the rounded corner styles on individual day cells. Individual day cells need different
   * corners to be rounded depending on which date range type and where the cell is located in the current grid.
   * If we just round all of the corners, there isn't a good overlap and we get gaps between contiguous day boxes
   * in Edge browser.
   *
   */
  const getWeekCornerStyles = (
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    initialWeeks: IDayInfo[][],
  ): IWeekCorners => {
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
    weeks.forEach((week: IDayInfo[], weekIndex: number) => {
      week.forEach((day: IDayInfo, dayIndex: number) => {
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

        const style = [];
        style.push(calculateRoundedStyles(classNames, above, below, left, right));
        style.push(calculateBorderStyles(classNames, above, below, left, right));

        weekCornersStyled[weekIndex + '_' + dayIndex] = style.join(' ');
      });
    });

    return weekCornersStyled;
  };

  const calculateRoundedStyles = (
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    above: boolean,
    below: boolean,
    left: boolean,
    right: boolean,
  ): string => {
    const style = [];
    const roundedTopLeft = !above && !left;
    const roundedTopRight = !above && !right;
    const roundedBottomLeft = !below && !left;
    const roundedBottomRight = !below && !right;

    if (roundedTopLeft) {
      style.push(getRTL() ? classNames.topRightCornerDate : classNames.topLeftCornerDate);
    }
    if (roundedTopRight) {
      style.push(getRTL() ? classNames.topLeftCornerDate : classNames.topRightCornerDate);
    }
    if (roundedBottomLeft) {
      style.push(getRTL() ? classNames.bottomRightCornerDate : classNames.bottomLeftCornerDate);
    }
    if (roundedBottomRight) {
      style.push(getRTL() ? classNames.bottomLeftCornerDate : classNames.bottomRightCornerDate);
    }

    return style.join(' ');
  };

  const calculateBorderStyles = (
    classNames: IProcessedStyleSet<ICalendarDayGridStyles>,
    above: boolean,
    below: boolean,
    left: boolean,
    right: boolean,
  ): string => {
    const style = [];

    if (!above) {
      style.push(classNames.datesAbove);
    }
    if (!below) {
      style.push(classNames.datesBelow);
    }
    if (!left) {
      style.push(getRTL() ? classNames.datesRight : classNames.datesLeft);
    }
    if (!right) {
      style.push(getRTL() ? classNames.datesLeft : classNames.datesRight);
    }

    return style.join(' ');
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

export const CalendarDayGridBase: React.FunctionComponent<ICalendarDayGridProps> = props => {
  const navigatedDayRef = React.useRef<HTMLTableCellElement>(null) as React.MutableRefObject<HTMLTableCellElement>;

  const activeDescendantId = useId();

  const onSelectDate = (selectedDate: Date): void => {
    const { firstDayOfWeek, minDate, maxDate, workWeekDays, daysToSelectInDayView, restrictedDates } = props;
    const restrictedDatesOptions = { minDate, maxDate, restrictedDates };

    let dateRange = getDateRangeArray(selectedDate, dateRangeType, firstDayOfWeek, workWeekDays, daysToSelectInDayView);
    dateRange = getBoundedDateRange(dateRange, minDate, maxDate);

    dateRange = dateRange.filter((d: Date) => {
      return !isRestrictedDate(d, restrictedDatesOptions);
    });

    props.onSelectDate?.(selectedDate, dateRange);
    props.onNavigateDate?.(selectedDate, true);
  };

  const [daysRef, getSetRefCallback] = useDayRefs();

  const weeks = useWeeks(props, onSelectDate, getSetRefCallback);
  const animateBackwards = useAnimateBackwards(weeks);
  const [getWeekCornerStyles, calculateRoundedStyles] = useWeekCornerStyles(props);

  React.useImperativeHandle(
    props.componentRef,
    () => ({
      focus() {
        navigatedDayRef.current?.focus?.();
      },
    }),
    [],
  );

  /**
   *
   * Section for setting hover/pressed styles. Because we want arbitrary blobs of days to be selectable, to support
   * highlighting every day in the month for month view, css :hover style isn't enough, so we need mouse callbacks
   * to set classnames on all relevant child refs to apply the styling
   *
   */
  const getDayInfosInRangeOfDay = (dayToCompare: IDayInfo): IDayInfo[] => {
    // The hover state looks weird with non-contiguous days in work week view. In work week, show week hover state
    const dateRangeHoverType = getDateRangeTypeToUse(props.dateRangeType, props.workWeekDays);

    // gets all the dates for the given date range type that are in the same date range as the given day
    const dateRange = getDateRangeArray(
      dayToCompare.originalDate,
      dateRangeHoverType,
      props.firstDayOfWeek,
      props.workWeekDays,
      props.daysToSelectInDayView,
    ).map((date: Date) => date.getTime());

    // gets all the day refs for the given dates
    const dayInfosInRange = weeks.reduce((accumulatedValue: IDayInfo[], currentWeek: IDayInfo[]) => {
      return accumulatedValue.concat(
        currentWeek.filter((weekDay: IDayInfo) => dateRange.indexOf(weekDay.originalDate.getTime()) !== -1),
      );
    }, []);

    return dayInfosInRange;
  };

  const getRefsFromDayInfos = (dayInfosInRange: IDayInfo[]): (HTMLElement | null)[] => {
    let dayRefs: (HTMLElement | null)[] = [];
    dayRefs = dayInfosInRange.map((dayInfo: IDayInfo) => daysRef.current[dayInfo.key]);

    return dayRefs;
  };

  const {
    styles,
    theme,
    className,
    dateRangeType,
    showWeekNumbers,
    labelledBy,
    lightenDaysOutsideNavigatedMonth,
    animationDirection,
  } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
    className,
    dateRangeType,
    showWeekNumbers,
    lightenDaysOutsideNavigatedMonth:
      lightenDaysOutsideNavigatedMonth === undefined ? true : lightenDaysOutsideNavigatedMonth,
    animationDirection,
    animateBackwards,
  });

  // When the month is highlighted get the corner dates so that styles can be added to them
  const weekCorners: IWeekCorners = getWeekCornerStyles(classNames, weeks!);
  const partialWeekProps = {
    weeks,
    navigatedDayRef,
    calculateRoundedStyles,
    activeDescendantId,
    classNames,
    weekCorners,
    getDayInfosInRangeOfDay,
    getRefsFromDayInfos,
  } as const;

  return (
    <FocusZone className={classNames.wrapper} preventDefaultWhenHandled={true}>
      <table
        className={classNames.table}
        aria-multiselectable="false"
        aria-labelledby={labelledBy}
        aria-activedescendant={activeDescendantId}
        role="grid"
      >
        <tbody>
          <CalendarMonthHeaderRow {...props} classNames={classNames} weeks={weeks} />
          <CalendarGridRow
            {...props}
            {...partialWeekProps}
            week={weeks[0]}
            weekIndex={-1}
            rowClassName={classNames.firstTransitionWeek}
            ariaRole="presentation"
            ariaHidden={true}
          />
          {weeks!.slice(1, weeks!.length - 1).map((week: IDayInfo[], weekIndex: number) => (
            <CalendarGridRow
              {...props}
              {...partialWeekProps}
              key={weekIndex}
              week={week}
              weekIndex={weekIndex}
              rowClassName={classNames.weekRow}
            />
          ))}
          <CalendarGridRow
            {...props}
            {...partialWeekProps}
            week={weeks![weeks!.length - 1]}
            weekIndex={-2}
            rowClassName={classNames.lastTransitionWeek}
            ariaRole="presentation"
            ariaHidden={true}
          />
        </tbody>
      </table>
    </FocusZone>
  );
};
CalendarDayGridBase.displayName = 'CalendarDayGridBase';

/**
 * When given work week, if the days are non-contiguous, the hover states look really weird. So for non-contiguous
 * work weeks, we'll just show week view instead.
 */
function getDateRangeTypeToUse(dateRangeType: DateRangeType, workWeekDays: DayOfWeek[] | undefined): DateRangeType {
  if (workWeekDays && dateRangeType === DateRangeType.WorkWeek) {
    const sortedWWDays = workWeekDays.slice().sort();
    let isContiguous = true;
    for (let i = 1; i < sortedWWDays.length; i++) {
      if (sortedWWDays[i] !== sortedWWDays[i - 1] + 1) {
        isContiguous = false;
        break;
      }
    }

    if (!isContiguous || workWeekDays.length === 0) {
      return DateRangeType.Week;
    }
  }

  return dateRangeType;
}
