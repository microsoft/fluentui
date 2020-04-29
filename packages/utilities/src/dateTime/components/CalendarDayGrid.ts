import { compareDates, compareDatePart, addDays, getDateRangeArray, isInDateRangeArray } from '../dateMath/DateMath';
import { DayOfWeek, DateRangeType } from '../dateValues/DateValues';
import { find } from '../../array';
import { ICalendarStrings } from './Calendar';

export const DAYS_IN_WEEK = 7;

export interface IDayInfo {
  key: string;
  date: string;
  originalDate: Date;
  isInMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInBounds: boolean;
  onSelected: () => void;
}

export interface ICalendarDayGridState {
  /**
   * Weeks is a 2D array. Weeks[0] contains the last week of the prior range,
   * Weeks[weeks.length - 1] contains first week of next range. These are for transition states.
   *
   * Weeks[1... weeks.length - 2] contains the actual visible data
   */
  weeks?: IDayInfo[][];
}

export interface ICalendarDayGridProps {
  /**
   * The currently selected date
   */
  selectedDate: Date;

  /**
   * The currently navigated date
   */
  navigatedDate: Date;

  /**
   * The first day of the week for your locale.
   * @defaultvalue DayOfWeek.Sunday
   */
  firstDayOfWeek: DayOfWeek;

  /**
   * The date range type indicating how  many days should be selected as the user
   * selects days
   * @defaultValue DateRangeType.Day
   */
  dateRangeType: DateRangeType;

  /**
   * The number of days to select while dateRangeType === DateRangeType.Day. Used in order to have multi-day
   * views.
   * @defaultValue 1
   */
  daysToSelectInDayView?: number;

  /**
   * Value of today. If null, current time in client machine will be used.
   */
  today?: Date;
  /**
   * How many weeks to show by default. If not provided, will show enough weeks to display the current
   * month, between 4 and 6 depending
   * @defaultvalue undefined
   */
  weeksToShow?: number;

  /**
   * If set the Calendar will not allow navigation to or selection of a date earlier than this value.
   */
  minDate?: Date;

  /**
   * If set the Calendar will not allow navigation to or selection of a date later than this value.
   */
  maxDate?: Date;

  /**
   * If set the Calendar will not allow selection of dates in this array.
   */
  restrictedDates?: Date[];

  /**
   * Localized strings to use in the Calendar
   */
  strings: ICalendarStrings;

  /**
   * The days that are selectable when `dateRangeType` is WorkWeek.
   * If `dateRangeType` is not WorkWeek this property does nothing.
   * @defaultvalue [Monday,Tuesday,Wednesday,Thursday,Friday]
   */
  workWeekDays?: DayOfWeek[];
}

export interface ICalendarDayGridStateAndProps extends ICalendarDayGridProps, ICalendarDayGridState {}

export function getIsRestrictedDate(props: ICalendarDayGridStateAndProps, date: Date): boolean {
  const { restrictedDates, minDate, maxDate } = props;
  if (!restrictedDates && !minDate && !maxDate) {
    return false;
  }
  const inRestrictedDates =
    restrictedDates &&
    !!find(restrictedDates, (rd: Date) => {
      return compareDates(rd, date);
    });
  return inRestrictedDates || getIsBeforeMinDate(props, date) || getIsAfterMaxDate(props, date);
}

export function getIsBeforeMinDate(props: ICalendarDayGridStateAndProps, date: Date): boolean {
  const { minDate } = props;
  return minDate ? compareDatePart(minDate, date) >= 1 : false;
}

export function getIsAfterMaxDate(props: ICalendarDayGridStateAndProps, date: Date): boolean {
  const { maxDate } = props;
  return maxDate ? compareDatePart(date, maxDate) >= 1 : false;
}

export function findAvailableDate(
  props: ICalendarDayGridStateAndProps,
  initialDate: Date,
  targetDate: Date,
  direction: number,
): Date | undefined {
  // if the target date is available, return it immediately
  if (!getIsRestrictedDate(props, targetDate)) {
    return targetDate;
  }

  while (
    compareDatePart(initialDate, targetDate) !== 0 &&
    getIsRestrictedDate(props, targetDate) &&
    !getIsAfterMaxDate(props, targetDate) &&
    !getIsBeforeMinDate(props, targetDate)
  ) {
    targetDate = addDays(targetDate, direction);
  }

  if (compareDatePart(initialDate, targetDate) !== 0 && !getIsRestrictedDate(props, targetDate)) {
    return targetDate;
  }

  return undefined;
}

export function getBoundedDateRange(dateRange: Date[], minDate?: Date, maxDate?: Date): Date[] {
  let boundedDateRange = [...dateRange];
  if (minDate) {
    boundedDateRange = boundedDateRange.filter((date: Date) => compareDatePart(date, minDate as Date) >= 0);
  }
  if (maxDate) {
    boundedDateRange = boundedDateRange.filter((date: Date) => compareDatePart(date, maxDate as Date) <= 0);
  }
  return boundedDateRange;
}

/**
 *
 * Section for setting hover/pressed styles. Because we want arbitrary blobs of days to be selectable, to support
 * highlighting every day in the month for month view, css :hover style isn't enough, so we need mouse callbacks
 * to set classnames on all relevant child refs to apply the styling
 *
 */
export function getDayInfosInRangeOfDay(props: ICalendarDayGridStateAndProps, day: IDayInfo): IDayInfo[] {
  const { dateRangeType, firstDayOfWeek, workWeekDays, daysToSelectInDayView, weeks } = props;

  // The hover state looks weird with non-contiguous days in work week view. In work week, show week hover state
  const dateRangeHoverType = getDateRangeTypeToUse(dateRangeType, workWeekDays);

  // gets all the dates for the given date range type that are in the same date range as the given day
  const dateRange = getDateRangeArray(
    day.originalDate,
    dateRangeHoverType,
    firstDayOfWeek,
    workWeekDays,
    daysToSelectInDayView,
  ).map((date: Date) => date.getTime());

  // gets all the day refs for the given dates
  const dayInfosInRange = weeks!.reduce((accumulatedValue: IDayInfo[], currentWeek: IDayInfo[]) => {
    return accumulatedValue.concat(
      currentWeek.filter((weekDay: IDayInfo) => dateRange.indexOf(weekDay.originalDate.getTime()) !== -1),
    );
  }, []);

  return dayInfosInRange;
}

/**
 * When given work week, if the days are non-contiguous, the hover states look really weird. So for non-contiguous
 * work weeks, we'll just show week view instead.
 */
export function getDateRangeTypeToUse(
  dateRangeType: DateRangeType,
  workWeekDays: DayOfWeek[] | undefined,
): DateRangeType {
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

/**
 * Initial parsing of the given props to generate IDayInfo two dimensional array, which contains a representation
 * of every day in the grid. Convenient for helping with conversions between day refs and Date objects in callbacks.
 */
export function getWeeks(props: ICalendarDayGridStateAndProps, onSelectDate: Function): IDayInfo[][] {
  const {
    selectedDate,
    dateRangeType,
    firstDayOfWeek,
    today,
    minDate,
    maxDate,
    weeksToShow,
    workWeekDays,
    daysToSelectInDayView,
  } = props;

  const todaysDate = today || new Date();

  const navigatedDate = props.navigatedDate ? props.navigatedDate : todaysDate;

  let date;
  if (weeksToShow && weeksToShow <= 4) {
    // if showing less than a full month, just use date == navigatedDate
    date = new Date(navigatedDate.toString());
  } else {
    date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
  }
  const weeks: IDayInfo[][] = [];

  // Cycle the date backwards to get to the first day of the week.
  while (date.getDay() !== firstDayOfWeek) {
    date.setDate(date.getDate() - 1);
  }

  // add the transition week as last week of previous range
  date = addDays(date, -DAYS_IN_WEEK);

  // a flag to indicate whether all days of the week are outside the month
  let isAllDaysOfWeekOutOfMonth = false;

  // in work week view if the days aren't contiguous we use week view instead
  const selectedDateRangeType = getDateRangeTypeToUse(dateRangeType, workWeekDays);

  let selectedDates = getDateRangeArray(
    selectedDate,
    selectedDateRangeType,
    firstDayOfWeek,
    workWeekDays,
    daysToSelectInDayView,
  );
  selectedDates = getBoundedDateRange(selectedDates, minDate, maxDate);

  let shouldGetWeeks = true;

  for (let weekIndex = 0; shouldGetWeeks; weekIndex++) {
    const week: IDayInfo[] = [];

    isAllDaysOfWeekOutOfMonth = true;

    for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
      const originalDate = new Date(date.toString());
      const dayInfo: IDayInfo = {
        key: date.toString(),
        date: date.getDate().toString(),
        originalDate,
        isInMonth: date.getMonth() === navigatedDate.getMonth(),
        isToday: compareDates(todaysDate, date),
        isSelected: isInDateRangeArray(date, selectedDates),
        onSelected: () => {
          onSelectDate(originalDate);
        },
        isInBounds: !getIsRestrictedDate(props, date),
      };

      week.push(dayInfo);

      if (dayInfo.isInMonth) {
        isAllDaysOfWeekOutOfMonth = false;
      }

      date.setDate(date.getDate() + 1);
    }

    // We append the condition of the loop depending upon the showSixWeeksByDefault prop.
    shouldGetWeeks = weeksToShow ? weekIndex < weeksToShow + 1 : !isAllDaysOfWeekOutOfMonth || weekIndex === 0;

    // we don't check shouldGetWeeks before pushing because we want to add one extra week for transition state
    weeks.push(week);
  }

  return weeks;
}
