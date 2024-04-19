import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import { useId } from '@fluentui/react-utilities';
import { getBoundedDateRange, getDateRangeArray, isRestrictedDate, DateRangeType, DayOfWeek } from '../../utils';
import { useCalendarDayGridStyles_unstable } from './useCalendarDayGridStyles.styles';
import { CalendarMonthHeaderRow } from './CalendarMonthHeaderRow';
import { CalendarGridRow } from './CalendarGridRow';
import { useWeeks } from './useWeeks';
import { useWeekCornerStyles, WeekCorners } from './useWeekCornerStyles.styles';
import { mergeClasses } from '@griffel/react';
import type { Day } from '../../utils';
import type { CalendarDayGridProps } from './CalendarDayGrid.types';

export interface DayInfo extends Day {
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

function useAnimateBackwards(weeks: DayInfo[][]): boolean | undefined {
  const previousNavigatedDateRef = React.useRef<Date | undefined>();
  React.useEffect(() => {
    previousNavigatedDateRef.current = weeks[0][0].originalDate;
  });
  const previousNavigatedDate = previousNavigatedDateRef.current;

  if (!previousNavigatedDate || previousNavigatedDate.getTime() === weeks[0][0].originalDate.getTime()) {
    return undefined;
  } else if (previousNavigatedDate <= weeks[0][0].originalDate) {
    return false;
  } else {
    return true;
  }
}

export const CalendarDayGrid: React.FunctionComponent<CalendarDayGridProps> = props => {
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
  const getDayInfosInRangeOfDay = (dayToCompare: DayInfo): DayInfo[] => {
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
    const dayInfosInRange = weeks.reduce((accumulatedValue: DayInfo[], currentWeek: DayInfo[]) => {
      return accumulatedValue.concat(
        currentWeek.filter((weekDay: DayInfo) => dateRange.indexOf(weekDay.originalDate.getTime()) !== -1),
      );
    }, []);

    return dayInfosInRange;
  };

  const getRefsFromDayInfos = (dayInfosInRange: DayInfo[]): (HTMLElement | null)[] => {
    let dayRefs: (HTMLElement | null)[] = [];
    dayRefs = dayInfosInRange.map((dayInfo: DayInfo) => daysRef.current[dayInfo.key]);

    return dayRefs;
  };

  const { dateRangeType, showWeekNumbers, labelledBy, lightenDaysOutsideNavigatedMonth, animationDirection } = props;

  const classNames = useCalendarDayGridStyles_unstable({
    animateBackwards,
    animationDirection,
    dateRangeType,
    lightenDaysOutsideNavigatedMonth:
      lightenDaysOutsideNavigatedMonth === undefined ? true : lightenDaysOutsideNavigatedMonth,
    showWeekNumbers,
  });

  // When the month is highlighted get the corner dates so that styles can be added to them
  const weekCorners: WeekCorners = getWeekCornerStyles(weeks!);
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

  const arrowNavigationAttributes = useArrowNavigationGroup({ axis: 'grid' });

  return (
    <table
      className={mergeClasses(classNames.table, props.className)}
      aria-multiselectable="false"
      aria-labelledby={labelledBy}
      aria-activedescendant={activeDescendantId}
      role="grid"
      {...arrowNavigationAttributes}
    >
      <tbody>
        <CalendarMonthHeaderRow {...props} classNames={classNames} weeks={weeks} />
        <CalendarGridRow
          {...props}
          {...partialWeekProps}
          week={weeks[0]}
          weekIndex={-1}
          rowClassName={classNames.firstTransitionWeek}
          aria-role="presentation"
          ariaHidden={true}
        />
        {weeks!.slice(1, weeks!.length - 1).map((week: DayInfo[], weekIndex: number) => (
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
          aria-role="presentation"
          ariaHidden={true}
        />
      </tbody>
    </table>
  );
};
CalendarDayGrid.displayName = 'CalendarDayGrid';

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
