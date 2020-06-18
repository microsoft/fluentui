import {
  IDay,
  IDayGridOptions,
  IRestrictedDatesOptions,
  IAvailableDateOptions,
  IDateGridStrings,
} from './DateGrid.types';
import { addDays, getDateRangeArray, compareDates, isInDateRangeArray, compareDatePart } from '../dateMath/DateMath';
import { DAYS_IN_WEEK, DateRangeType, DayOfWeek } from '../dateValues/DateValues';

/**
 * Generates a grid of days, given the options
 * Returns one additional week at the begining from the previous range
 * and one at the end from the future range
 * @param options - parameters to specify date related restrictions for the resulting grid
 */
export const getDayGrid = (options: IDayGridOptions): IDay[][] => {
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
    restrictedDates,
  } = options;
  const restrictedDateOptions = { minDate, maxDate, restrictedDates };

  const todaysDate = today || new Date();

  const navigatedDate = options.navigatedDate ? options.navigatedDate : todaysDate;

  let date;
  if (weeksToShow && weeksToShow <= 4) {
    // if showing less than a full month, just use date == navigatedDate
    date = new Date(navigatedDate.toString());
  } else {
    date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
  }
  const weeks: IDay[][] = [];

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
    const week: IDay[] = [];

    isAllDaysOfWeekOutOfMonth = true;

    for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
      const originalDate = new Date(date.toString());
      const dayInfo: IDay = {
        key: date.toString(),
        date: date.getDate().toString(),
        originalDate: originalDate,
        isInMonth: date.getMonth() === navigatedDate.getMonth(),
        isToday: compareDates(todaysDate, date),
        isSelected: isInDateRangeArray(date, selectedDates),
        isInBounds: !isRestrictedDate(date, restrictedDateOptions),
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
};

/**
 * Checks if the input @date param falls into the restricted options
 * @param date - date to check
 * @param options - restriction options (min date, max date and list of restricted dates)
 */
export const isRestrictedDate = (date: Date, options: IRestrictedDatesOptions): boolean => {
  const { restrictedDates, minDate, maxDate } = options;
  if (!restrictedDates && !minDate && !maxDate) {
    return false;
  }
  const inRestrictedDates = restrictedDates && restrictedDates.some((rd: Date) => compareDates(rd, date));
  return inRestrictedDates || isBeforeMinDate(date, options) || isAfterMaxDate(date, options);
};

/**
 * Checks if the input @date param happens earlier than min date
 * @param date - date to check
 * @param options - object with min date to check against
 */
export const isBeforeMinDate = (date: Date, options: IRestrictedDatesOptions): boolean => {
  const { minDate } = options;
  return minDate ? compareDatePart(minDate, date) >= 1 : false;
};

/**
 * Checks if the input @date param happens later than max date
 * @param date - date to check
 * @param options - object with max date to check against
 */
export const isAfterMaxDate = (date: Date, options: IRestrictedDatesOptions): boolean => {
  const { maxDate } = options;
  return maxDate ? compareDatePart(date, maxDate) >= 1 : false;
};

/**
 * Generates a list of dates, bounded by min and max dates
 * @param dateRange - input date range
 * @param minDate - min date to limit the range
 * @param maxDate - max date to limit the range
 */
export const getBoundedDateRange = (dateRange: Date[], minDate?: Date, maxDate?: Date): Date[] => {
  let boundedDateRange = [...dateRange];
  if (minDate) {
    boundedDateRange = boundedDateRange.filter((date: Date) => compareDatePart(date, minDate as Date) >= 0);
  }
  if (maxDate) {
    boundedDateRange = boundedDateRange.filter((date: Date) => compareDatePart(date, maxDate as Date) <= 0);
  }
  return boundedDateRange;
};

/**
 * Return corrected date range type, given input date range type and list of working days.
 * For non-contiguous working days and working week range type, returns general week range type.
 * For other cases returns input date range type.
 * @param dateRangeType - input type of range
 * @param workWeekDays - list of working days in a week
 */
export const getDateRangeTypeToUse = (
  dateRangeType: DateRangeType,
  workWeekDays: DayOfWeek[] | undefined,
): DateRangeType => {
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
};

/**
 * Returns closest available date given the restriction options, or undefined otherwise
 * @param options - list of options
 * initialDate - date from which we start the search
 * targetDate - ideal available date
 * direction - direction of search (`1` - search in future / `-1` search in past)
 * minDate - min date to consider
 * maxDate - max date to consider
 * restrtictedDates - list of unavailable dates
 */
export const findAvailableDate = (options: IAvailableDateOptions): Date | undefined => {
  const { targetDate, initialDate, direction, ...restrictedDateOptions } = options;
  let availableDate = targetDate;
  // if the target date is available, return it immediately
  if (!isRestrictedDate(targetDate, restrictedDateOptions)) {
    return targetDate;
  }

  while (
    compareDatePart(initialDate, availableDate) !== 0 &&
    isRestrictedDate(availableDate, restrictedDateOptions) &&
    !isAfterMaxDate(availableDate, restrictedDateOptions) &&
    !isBeforeMinDate(availableDate, restrictedDateOptions)
  ) {
    availableDate = addDays(availableDate, direction);
  }

  if (compareDatePart(initialDate, availableDate) !== 0 && !isRestrictedDate(availableDate, restrictedDateOptions)) {
    return availableDate;
  }

  return undefined;
};

/**
 * Format date to a month-day-year string
 * @param date - input date to format
 * @param strings - localized strings
 */
export const formatMonthDayYear = (date: Date, strings: IDateGridStrings) =>
  strings.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
/**
 * Format date to a month-year string
 * @param date - input date to format
 * @param strings - localized strings
 */
export const formatMonthYear = (date: Date, strings: IDateGridStrings) =>
  strings.months[date.getMonth()] + ' ' + date.getFullYear();
/**
 * Format date to a day string representation
 * @param date - input date to format
 */
export const formatDay = (date: Date) => date.getDate().toString();
/**
 * Format date to a year string representation
 * @param date - input date to format
 */
export const formatYear = (date: Date) => date.getFullYear().toString();
