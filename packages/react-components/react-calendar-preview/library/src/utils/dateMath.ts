import { DAYS_IN_WEEK, getDayIndex, getMonthIndex } from './constants';
import type { DateRangeType, DayOfWeek, FirstWeekOfYear } from './constants';

/**
 * Creates a new Date object with the specified year, month, and day, with the time set to midnight.
 */
function createDate(year: number, month: number, day: number): Date {
  const date = new Date(0);
  date.setHours(0, 0, 0, 0);
  date.setFullYear(year, month, day);
  return date;
}

/**
 * Returns a date offset from the given date by the specified number of days.
 * @param date - The origin date
 * @param days - The number of days to offset. 'days' can be negative.
 * @returns A new Date object offset from the origin date by the given number of days
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Returns a date offset from the given date by the specified number of weeks.
 * @param date - The origin date
 * @param weeks - The number of weeks to offset. 'weeks' can be negative.
 * @returns A new Date object offset from the origin date by the given number of weeks
 */
export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * DAYS_IN_WEEK);
}

/**
 * Returns a date offset from the given date by the specified number of months.
 * The method tries to preserve the day-of-month; however, if the new month does not have enough days
 * to contain the original day-of-month, we'll use the last day of the new month.
 * @param date - The origin date
 * @param months - The number of months to offset. 'months' can be negative.
 * @returns A new Date object offset from the origin date by the given number of months
 */
export function addMonths(date: Date, months: number): Date {
  let result = new Date(date.getTime());
  const targetMonth = result.getMonth() + months;
  result.setMonth(targetMonth);

  const normalizedTargetMonth = ((targetMonth % 12) + 12) % 12;
  if (result.getMonth() !== normalizedTargetMonth) {
    result = addDays(result, -result.getDate());
  }

  return result;
}

/**
 * Returns a date offset from the given date by the specified number of years.
 * The method tries to preserve the day-of-month; however, if the new month does not have enough days
 * to contain the original day-of-month, we'll use the last day of the new month.
 * @param date - The origin date
 * @param years - The number of years to offset. 'years' can be negative.
 * @returns A new Date object offset from the origin date by the given number of years
 */
export function addYears(date: Date, years: number): Date {
  let result = new Date(date.getTime());
  result.setFullYear(date.getFullYear() + years);

  if (result.getMonth() !== date.getMonth()) {
    result = addDays(result, -result.getDate());
  }

  return result;
}

/**
 * Returns a date that is the first day of the month of the provided date.
 * @param date - The origin date
 * @returns A new Date object with the day set to the first day of the month.
 */
export function getMonthStart(date: Date): Date {
  return createDate(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Returns a date that is the last day of the month of the provided date.
 * @param date - The origin date
 * @returns A new Date object with the day set to the last day of the month.
 */
export function getMonthEnd(date: Date): Date {
  return addDays(createDate(date.getFullYear(), date.getMonth() + 1, 1), -1);
}

/**
 * Returns a date that is the first day of the year of the provided date.
 * @param date - The origin date
 * @returns A new Date object with the day set to the first day of the year.
 */
export function getYearStart(date: Date): Date {
  return createDate(date.getFullYear(), 0, 1);
}

/**
 * Returns a date that is the last day of the year of the provided date.
 * @param date - The origin date
 * @returns A new Date object with the day set to the last day of the year.
 */
export function getYearEnd(date: Date): Date {
  return addDays(createDate(date.getFullYear() + 1, 0, 1), -1);
}

/**
 * Returns a date that is a copy of the given date, aside from the month changing to the given month.
 * The method tries to preserve the day-of-month; however, if the new month does not have enough days
 * to contain the original day-of-month, we'll use the last day of the new month.
 * @param date - The origin date
 * @param month - The 0-based index of the month to set on the date.
 * @returns A new Date object with the given month set.
 */
export function setMonth(date: Date, month: number): Date {
  return addMonths(date, month - date.getMonth());
}

/**
 * Compares two dates, and returns true if the two dates (not accounting for time-of-day) are equal.
 * @returns True if the two dates represent the same date (regardless of time-of-day), false otherwise.
 */
export function areDatesEqual(date1: Date, date2: Date): boolean {
  if (!date1 && !date2) {
    return true;
  } else if (!date1 || !date2) {
    return false;
  } else {
    return compareDatePart(date1, date2) === 0;
  }
}

/**
 * Compare the date parts of two dates
 * @param date1 - The first date to compare
 * @param date2 - The second date to compare
 * @returns A negative value if date1 is earlier than date2, 0 if the dates are equal, or a positive value
 * if date1 is later than date2.
 */
export function compareDatePart(date1: Date, date2: Date): number {
  return (
    date1.getFullYear() - date2.getFullYear() ||
    date1.getMonth() - date2.getMonth() ||
    date1.getDate() - date2.getDate()
  );
}

/**
 * Gets the date range array including the specified date. The date range array is calculated as the list
 * of dates accounting for the specified first day of the week and date range type.
 * @param date - The input date
 * @param dateRangeType - The desired date range type, i.e., day, week, month, etc.
 * @param firstDayOfWeek - The first day of the week.
 * @param workWeekDays - The allowed days in work week. If not provided, assumes all days are allowed.
 * @param daysToSelectInDayView - The number of days to include when using dateRangeType === 'day'
 * for multiday view. Defaults to 1
 * @returns An array of dates representing the date range containing the specified date.
 */
export function getDateRange(
  date: Date,
  dateRangeType: DateRangeType,
  firstDayOfWeek: DayOfWeek,
  workWeekDays?: DayOfWeek[],
  daysToSelectInDayView: number = 1,
): Date[] {
  if (!Number.isFinite(date.valueOf())) {
    throw new RangeError('date must be valid');
  }

  if (!Number.isFinite(daysToSelectInDayView) || !Number.isInteger(daysToSelectInDayView)) {
    throw new RangeError('daysToSelectInDayView must be a finite integer');
  }

  if (dateRangeType === 'day' && daysToSelectInDayView === 0) {
    return [];
  }

  const datesArray: Date[] = [];
  let startDate: Date;
  let endDate = null;
  let maximumRangeLength: number;

  if (!workWeekDays) {
    workWeekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  }

  const workWeekDayIndices = workWeekDays.map(getDayIndex);

  switch (dateRangeType) {
    case 'day':
      // Create a date range for the specified date

      [startDate, endDate] = [date, addDays(date, daysToSelectInDayView)];
      maximumRangeLength = Math.abs(daysToSelectInDayView);

      // If the start date is after the end date, swap them
      if (compareDatePart(startDate, endDate) > 0) {
        /*
         * For reverse dates we need to add one day to both dates
         * to ensure correct start date
         */
        [startDate, endDate] = [addDays(endDate, 1), addDays(startDate, 1)];
      }

      break;

    case 'week':
    case 'workWeek':
      startDate = getStartDateOfWeek(date, firstDayOfWeek);
      endDate = addDays(startDate, DAYS_IN_WEEK);
      maximumRangeLength = DAYS_IN_WEEK;
      break;

    case 'month':
      startDate = createDate(date.getFullYear(), date.getMonth(), 1);
      endDate = addMonths(startDate, 1);
      maximumRangeLength = 31;
      break;

    default:
      throw new Error('Unexpected object: ' + dateRangeType);
  }

  // Populate the dates array with a range-specific bound so a faulty adapter cannot hang rendering.
  let nextDate = startDate;
  for (let index = 0; index < maximumRangeLength && compareDatePart(nextDate, endDate) !== 0; index++) {
    if (dateRangeType !== 'workWeek') {
      // push all days not in work week view
      datesArray.push(nextDate);
    } else if (workWeekDayIndices.indexOf(nextDate.getDay()) !== -1) {
      datesArray.push(nextDate);
    }
    nextDate = addDays(nextDate, 1);
  }

  if (compareDatePart(nextDate, endDate) !== 0) {
    throw new Error('Date range iteration did not reach the end of the requested range');
  }

  return datesArray;
}

/**
 * Checks whether the specified date is in the given date range.
 * @param date - The origin date
 * @param dateRange - An array of dates to do the lookup on
 * @returns True if the date matches one of the dates in the specified array, false otherwise.
 */
export function isDateInRange(date: Date, dateRange: Date[]): boolean {
  for (const dateInRange of dateRange) {
    if (compareDatePart(date, dateInRange) === 0) {
      return true;
    }
  }
  return false;
}

/**
 * Returns the week number in a year for a date.
 *
 * @param navigatedDate - A date to find the week number for.
 * @param firstDayOfWeek - The named day that starts each week.
 * @param firstWeekOfYear - The convention that determines which week is the first week of the year.
 * @returns The week number array for the current month.
 */
export function getWeekNumbersInMonth(
  weeksInMonth: number,
  firstDayOfWeek: DayOfWeek,
  firstWeekOfYear: FirstWeekOfYear,
  navigatedDate: Date,
): number[] {
  const selectedYear = navigatedDate.getFullYear();
  const selectedMonth = navigatedDate.getMonth();
  const firstDayOfWeekIndex = getDayIndex(firstDayOfWeek);
  let dayOfMonth = 1;
  const firstDayOfMonth = createDate(selectedYear, selectedMonth, dayOfMonth);
  const endOfFirstWeek =
    dayOfMonth +
    (firstDayOfWeekIndex + DAYS_IN_WEEK - 1) -
    adjustWeekDay(firstDayOfWeekIndex, firstDayOfMonth.getDay());
  let endOfWeekRange = createDate(selectedYear, selectedMonth, endOfFirstWeek);
  dayOfMonth = endOfWeekRange.getDate();

  const weeksArray = [];
  for (let i = 0; i < weeksInMonth; i++) {
    // Get week number for end of week
    weeksArray.push(getWeekNumber(endOfWeekRange, firstDayOfWeek, firstWeekOfYear));
    dayOfMonth += DAYS_IN_WEEK;
    endOfWeekRange = createDate(selectedYear, selectedMonth, dayOfMonth);
  }
  return weeksArray;
}

/**
 * Returns the week number for a date.
 *
 * @param date - A date to find the week number for.
 * @param firstDayOfWeek - The named day that starts each week.
 * @param firstWeekOfYear - The convention that determines which week is the first week of the year.
 * @returns The week's number in the year.
 */
export function getWeekNumber(date: Date, firstDayOfWeek: DayOfWeek, firstWeekOfYear: FirstWeekOfYear): number {
  // First four-day week of the year - minimum days count
  const fourDayWeek = 4;

  switch (firstWeekOfYear) {
    case 'firstFullWeek':
      return getWeekOfYearFullDays(date, firstDayOfWeek, DAYS_IN_WEEK);

    case 'firstFourDayWeek':
      return getWeekOfYearFullDays(date, firstDayOfWeek, fourDayWeek);

    default:
      return getFirstDayWeekOfYear(date, firstDayOfWeek);
  }
}

/**
 * Gets the date for the first day of the week based on the given date assuming
 * the specified first day of the week.
 * @param date - The date to find the beginning of the week date for.
 * @returns A new date object representing the first day of the week containing the input date.
 */
export function getStartDateOfWeek(date: Date, firstDayOfWeek: DayOfWeek): Date {
  let daysOffset = getDayIndex(firstDayOfWeek) - date.getDay();
  if (daysOffset > 0) {
    // If first day of week is > date, go 1 week back, to ensure resulting date is in the past.
    daysOffset -= DAYS_IN_WEEK;
  }
  return addDays(date, daysOffset);
}

/**
 * Helper function for `getWeekNumber`.
 * Returns week number for a date.
 * @param date - current selected date.
 * @param firstDayOfWeek - The first day of week (0-6, Sunday = 0)
 * @param numberOfFullDays - week settings.
 * @returns The week's number in the year.
 */
function getWeekOfYearFullDays(date: Date, firstDayOfWeek: DayOfWeek, numberOfFullDays: number): number {
  const firstDayOfWeekIndex = getDayIndex(firstDayOfWeek);
  const dayOfYear = getDayOfYear(date) - 1;
  let num = date.getDay() - (dayOfYear % DAYS_IN_WEEK);

  const lastDayOfPrevYear = createDate(date.getFullYear() - 1, getMonthIndex('december'), 31);
  const daysInYear = getDayOfYear(lastDayOfPrevYear) - 1;

  let num2 = (firstDayOfWeekIndex - num + 2 * DAYS_IN_WEEK) % DAYS_IN_WEEK;
  if (num2 !== 0 && num2 >= numberOfFullDays) {
    num2 -= DAYS_IN_WEEK;
  }

  let num3 = dayOfYear - num2;
  if (num3 < 0) {
    num -= daysInYear % DAYS_IN_WEEK;
    num2 = (firstDayOfWeekIndex - num + 2 * DAYS_IN_WEEK) % DAYS_IN_WEEK;
    if (num2 !== 0 && num2 + 1 >= numberOfFullDays) {
      num2 -= DAYS_IN_WEEK;
    }

    num3 = daysInYear - num2;
  }

  return Math.floor(num3 / DAYS_IN_WEEK + 1);
}

/**
 * Helper function for `getWeekNumber`.
 * Returns week number for a date.
 * @param date - current selected date.
 * @param firstDayOfWeek - The first day of week (0-6, Sunday = 0)
 * @returns The week's number in the year.
 */
function getFirstDayWeekOfYear(date: Date, firstDayOfWeek: DayOfWeek): number {
  const num = getDayOfYear(date) - 1;
  const num2 = date.getDay() - (num % DAYS_IN_WEEK);
  const num3 = (num2 - getDayIndex(firstDayOfWeek) + 2 * DAYS_IN_WEEK) % DAYS_IN_WEEK;

  return Math.floor((num + num3) / DAYS_IN_WEEK + 1);
}

/**
 * Helper function for `getWeekNumber`.
 * Returns adjusted week day number when `firstDayOfWeek` is other than Sunday.
 * For Week Day Number comparison checks
 * @param firstDayOfWeekIndex - The first day of week (0-6, Sunday = 0)
 * @param dateWeekDay - shifts number forward to 1 week in case passed as true
 * @returns The day of week adjusted to `firstDayOfWeek`; e.g. when `firstDayOfWeek` is Monday (1),
 * Sunday becomes 7.
 */
function adjustWeekDay(firstDayOfWeekIndex: number, dateWeekDay: number): number {
  return firstDayOfWeekIndex !== 0 && dateWeekDay < firstDayOfWeekIndex ? dateWeekDay + DAYS_IN_WEEK : dateWeekDay;
}

/**
 * Returns the day number for a date in a year:
 * the number of days since January 1st in the particular year.
 * @param date - A date to find the day number for.
 * @returns The day's number in the year.
 */
function getDayOfYear(date: Date): number {
  const month = date.getMonth();
  const year = date.getFullYear();
  let daysUntilDate = 0;

  for (let i = 0; i < month; i++) {
    daysUntilDate += daysInMonth(i + 1, year);
  }

  daysUntilDate += date.getDate();

  return daysUntilDate;
}

/**
 * Returns the number of days in the month
 * @param month - The month number to target (months 1-12).
 * @param year - The year to target.
 * @returns The number of days in the month.
 */
function daysInMonth(month: number, year: number): number {
  return createDate(year, month, 0).getDate();
}
