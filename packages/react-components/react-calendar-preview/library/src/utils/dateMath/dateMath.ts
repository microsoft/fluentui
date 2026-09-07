import { getDayIndex, getMonthIndex, TimeConstants } from '../constants';
import { dateAdapter } from '../dateAdapter';
import type { CalendarDateAdapter } from '../dateAdapter';
import type { DateRangeType, DayOfWeek, FirstWeekOfYear } from '../constants';

/**
 * Returns a date offset from the given date by the specified number of days.
 * @param date - The origin date
 * @param days - The number of days to offset. 'days' can be negative.
 * @returns A new Date object offset from the origin date by the given number of days
 */
export function addDays(date: Date, days: number, adapter: CalendarDateAdapter<Date> = dateAdapter): Date {
  return adapter.addDays(date, days);
}

/**
 * Returns a date offset from the given date by the specified number of weeks.
 * @param date - The origin date
 * @param weeks - The number of weeks to offset. 'weeks' can be negative.
 * @returns A new Date object offset from the origin date by the given number of weeks
 */
export function addWeeks(date: Date, weeks: number, adapter: CalendarDateAdapter<Date> = dateAdapter): Date {
  return adapter.addDays(date, weeks * TimeConstants.DaysInOneWeek);
}

/**
 * Returns a date offset from the given date by the specified number of months.
 * The method tries to preserve the day-of-month; however, if the new month does not have enough days
 * to contain the original day-of-month, we'll use the last day of the new month.
 * @param date - The origin date
 * @param months - The number of months to offset. 'months' can be negative.
 * @returns A new Date object offset from the origin date by the given number of months
 */
export function addMonths(date: Date, months: number, adapter: CalendarDateAdapter<Date> = dateAdapter): Date {
  return adapter.addMonths(date, months);
}

/**
 * Returns a date offset from the given date by the specified number of years.
 * The method tries to preserve the day-of-month; however, if the new month does not have enough days
 * to contain the original day-of-month, we'll use the last day of the new month.
 * @param date - The origin date
 * @param years - The number of years to offset. 'years' can be negative.
 * @returns A new Date object offset from the origin date by the given number of years
 */
export function addYears(date: Date, years: number, adapter: CalendarDateAdapter<Date> = dateAdapter): Date {
  return adapter.addYears(date, years);
}

/**
 * Returns a date that is the first day of the month of the provided date.
 * @param date - The origin date
 * @returns A new Date object with the day set to the first day of the month.
 */
export function getMonthStart(date: Date, adapter: CalendarDateAdapter<Date> = dateAdapter): Date {
  return adapter.createDate(adapter.getYear(date), adapter.getMonth(date), 1);
}

/**
 * Returns a date that is the last day of the month of the provided date.
 * @param date - The origin date
 * @returns A new Date object with the day set to the last day of the month.
 */
export function getMonthEnd(date: Date, adapter: CalendarDateAdapter<Date> = dateAdapter): Date {
  return adapter.addDays(adapter.createDate(adapter.getYear(date), adapter.getMonth(date) + 1, 1), -1);
}

/**
 * Returns a date that is the first day of the year of the provided date.
 * @param date - The origin date
 * @returns A new Date object with the day set to the first day of the year.
 */
export function getYearStart(date: Date, adapter: CalendarDateAdapter<Date> = dateAdapter): Date {
  return adapter.createDate(adapter.getYear(date), 0, 1);
}

/**
 * Returns a date that is the last day of the year of the provided date.
 * @param date - The origin date
 * @returns A new Date object with the day set to the last day of the year.
 */
export function getYearEnd(date: Date, adapter: CalendarDateAdapter<Date> = dateAdapter): Date {
  return adapter.addDays(adapter.createDate(adapter.getYear(date) + 1, 0, 1), -1);
}

/**
 * Returns a date that is a copy of the given date, aside from the month changing to the given month.
 * The method tries to preserve the day-of-month; however, if the new month does not have enough days
 * to contain the original day-of-month, we'll use the last day of the new month.
 * @param date - The origin date
 * @param month - The 0-based index of the month to set on the date.
 * @returns A new Date object with the given month set.
 */
export function setMonth(date: Date, month: number, adapter: CalendarDateAdapter<Date> = dateAdapter): Date {
  return adapter.addMonths(date, month - adapter.getMonth(date));
}

/**
 * Compares two dates, and returns true if the two dates (not accounting for time-of-day) are equal.
 * @returns True if the two dates represent the same date (regardless of time-of-day), false otherwise.
 */
export function compareDates(date1: Date, date2: Date, adapter: CalendarDateAdapter<Date> = dateAdapter): boolean {
  if (!date1 && !date2) {
    return true;
  } else if (!date1 || !date2) {
    return false;
  } else {
    return adapter.compareDates(date1, date2) === 0;
  }
}

/**
 * Compare the date parts of two dates
 * @param date1 - The first date to compare
 * @param date2 - The second date to compare
 * @returns A negative value if date1 is earlier than date2, 0 if the dates are equal, or a positive value
 * if date1 is later than date2.
 */
export function compareDatePart(date1: Date, date2: Date, adapter: CalendarDateAdapter<Date> = dateAdapter): number {
  return adapter.compareDates(date1, date2);
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
export function getDateRangeArray(
  date: Date,
  dateRangeType: DateRangeType,
  firstDayOfWeek: DayOfWeek,
  workWeekDays?: DayOfWeek[],
  daysToSelectInDayView: number = 1,
  adapter: CalendarDateAdapter<Date> = dateAdapter,
): Date[] {
  const datesArray: Date[] = [];
  let startDate: Date;
  let endDate = null;

  if (!workWeekDays) {
    workWeekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  }

  const workWeekDayIndices = workWeekDays.map(getDayIndex);

  switch (dateRangeType) {
    case 'day':
      // Create a date range for the specified date

      [startDate, endDate] = [date, adapter.addDays(date, daysToSelectInDayView)];

      // If the start date is after the end date, swap them
      if (adapter.compareDates(startDate, endDate) > 0) {
        /*
         * For reverse dates we need to add one day to both dates
         * to ensure correct start date
         */
        [startDate, endDate] = [adapter.addDays(endDate, 1), adapter.addDays(startDate, 1)];
      }

      break;

    case 'week':
    case 'workWeek':
      startDate = getStartDateOfWeek(date, firstDayOfWeek, adapter);
      endDate = adapter.addDays(startDate, TimeConstants.DaysInOneWeek);
      break;

    case 'month':
      startDate = adapter.createDate(adapter.getYear(date), adapter.getMonth(date), 1);
      endDate = adapter.addMonths(startDate, 1);
      break;

    default:
      throw new Error('Unexpected object: ' + dateRangeType);
  }

  // Populate the dates array with the dates in range
  let nextDate = startDate;

  do {
    if (dateRangeType !== 'workWeek') {
      // push all days not in work week view
      datesArray.push(nextDate);
    } else if (workWeekDayIndices.indexOf(adapter.getDay(nextDate)) !== -1) {
      datesArray.push(nextDate);
    }
    nextDate = adapter.addDays(nextDate, 1);
  } while (adapter.compareDates(nextDate, endDate) !== 0);

  return datesArray;
}

/**
 * Checks whether the specified date is in the given date range.
 * @param date - The origin date
 * @param dateRange - An array of dates to do the lookup on
 * @returns True if the date matches one of the dates in the specified array, false otherwise.
 */
export function isInDateRangeArray(
  date: Date,
  dateRange: Date[],
  adapter: CalendarDateAdapter<Date> = dateAdapter,
): boolean {
  for (const dateInRange of dateRange) {
    if (adapter.compareDates(date, dateInRange) === 0) {
      return true;
    }
  }
  return false;
}

/**
 * Returns the week number for a date.
 * Week numbers are 1 - 52 (53) in a year
 * @param navigatedDate - A date to find the week number for.
 * @param firstDayOfWeek - The first day of the week (0-6, Sunday = 0)
 * @param firstWeekOfYear - The first week of the year (1-2)
 * @returns The weeks number array for the current month.
 */
export function getWeekNumbersInMonth(
  weeksInMonth: number,
  firstDayOfWeek: DayOfWeek,
  firstWeekOfYear: FirstWeekOfYear,
  navigatedDate: Date,
  adapter: CalendarDateAdapter<Date> = dateAdapter,
): number[] {
  const selectedYear = adapter.getYear(navigatedDate);
  const selectedMonth = adapter.getMonth(navigatedDate);
  const firstDayOfWeekIndex = getDayIndex(firstDayOfWeek);
  let dayOfMonth = 1;
  const fistDayOfMonth = adapter.createDate(selectedYear, selectedMonth, dayOfMonth);
  const endOfFirstWeek =
    dayOfMonth +
    (firstDayOfWeekIndex + TimeConstants.DaysInOneWeek - 1) -
    adjustWeekDay(firstDayOfWeekIndex, adapter.getDay(fistDayOfMonth));
  let endOfWeekRange = adapter.createDate(selectedYear, selectedMonth, endOfFirstWeek);
  dayOfMonth = adapter.getDate(endOfWeekRange);

  const weeksArray = [];
  for (let i = 0; i < weeksInMonth; i++) {
    // Get week number for end of week
    weeksArray.push(getWeekNumber(endOfWeekRange, firstDayOfWeek, firstWeekOfYear, adapter));
    dayOfMonth += TimeConstants.DaysInOneWeek;
    endOfWeekRange = adapter.createDate(selectedYear, selectedMonth, dayOfMonth);
  }
  return weeksArray;
}

/**
 * Returns the week number for a date.
 * Week numbers are 1 - 52 (53) in a year
 * @param date - A date to find the week number for.
 * @param firstDayOfWeek - The first day of the week (0-6, Sunday = 0)
 * @param firstWeekOfYear - The first week of the year (1-2)
 * @returns The week's number in the year.
 */
export function getWeekNumber(
  date: Date,
  firstDayOfWeek: DayOfWeek,
  firstWeekOfYear: FirstWeekOfYear,
  adapter: CalendarDateAdapter<Date> = dateAdapter,
): number {
  // First four-day week of the year - minumum days count
  const fourDayWeek = 4;

  switch (firstWeekOfYear) {
    case 'firstFullWeek':
      return getWeekOfYearFullDays(date, firstDayOfWeek, TimeConstants.DaysInOneWeek, adapter);

    case 'firstFourDayWeek':
      return getWeekOfYearFullDays(date, firstDayOfWeek, fourDayWeek, adapter);

    default:
      return getFirstDayWeekOfYear(date, firstDayOfWeek, adapter);
  }
}

/**
 * Gets the date for the first day of the week based on the given date assuming
 * the specified first day of the week.
 * @param date - The date to find the beginning of the week date for.
 * @returns A new date object representing the first day of the week containing the input date.
 */
export function getStartDateOfWeek(
  date: Date,
  firstDayOfWeek: DayOfWeek,
  adapter: CalendarDateAdapter<Date> = dateAdapter,
): Date {
  let daysOffset = getDayIndex(firstDayOfWeek) - adapter.getDay(date);
  if (daysOffset > 0) {
    // If first day of week is > date, go 1 week back, to ensure resulting date is in the past.
    daysOffset -= TimeConstants.DaysInOneWeek;
  }
  return adapter.addDays(date, daysOffset);
}

/**
 * Gets the date for the last day of the week based on the given date assuming
 * the specified first day of the week.
 * @param date - The date to find the beginning of the week date for.
 * @returns A new date object representing the first day of the week containing the input date.
 */
export function getEndDateOfWeek(
  date: Date,
  firstDayOfWeek: DayOfWeek,
  adapter: CalendarDateAdapter<Date> = dateAdapter,
): Date {
  const firstDayOfWeekIndex = getDayIndex(firstDayOfWeek);
  const lastDayOfWeek = firstDayOfWeekIndex - 1 >= 0 ? firstDayOfWeekIndex - 1 : TimeConstants.DaysInOneWeek - 1;
  let daysOffset = lastDayOfWeek - adapter.getDay(date);
  if (daysOffset < 0) {
    // If last day of week is < date, go 1 week forward, to ensure resulting date is in the future.
    daysOffset += TimeConstants.DaysInOneWeek;
  }
  return adapter.addDays(date, daysOffset);
}

/**
 * Helper function to assist in date comparisons
 */
export function getDatePartHashValue(date: Date, adapter: CalendarDateAdapter<Date> = dateAdapter): number {
  // Generate date hash value created as sum of Date (up to 31 = 5 bits), Month (up to 11 = 4 bits) and Year.
  // eslint-disable-next-line no-bitwise
  return adapter.getDate(date) + (adapter.getMonth(date) << 5) + (adapter.getYear(date) << 9);
}

/**
 * Helper function for `getWeekNumber`.
 * Returns week number for a date.
 * @param date - current selected date.
 * @param firstDayOfWeek - The first day of week (0-6, Sunday = 0)
 * @param numberOfFullDays - week settings.
 * @returns The week's number in the year.
 */
function getWeekOfYearFullDays(
  date: Date,
  firstDayOfWeek: DayOfWeek,
  numberOfFullDays: number,
  adapter: CalendarDateAdapter<Date>,
): number {
  const firstDayOfWeekIndex = getDayIndex(firstDayOfWeek);
  const dayOfYear = getDayOfYear(date, adapter) - 1;
  let num = adapter.getDay(date) - (dayOfYear % TimeConstants.DaysInOneWeek);

  const lastDayOfPrevYear = adapter.createDate(adapter.getYear(date) - 1, getMonthIndex('december'), 31);
  const daysInYear = getDayOfYear(lastDayOfPrevYear, adapter) - 1;

  let num2 = (firstDayOfWeekIndex - num + 2 * TimeConstants.DaysInOneWeek) % TimeConstants.DaysInOneWeek;
  if (num2 !== 0 && num2 >= numberOfFullDays) {
    num2 -= TimeConstants.DaysInOneWeek;
  }

  let num3 = dayOfYear - num2;
  if (num3 < 0) {
    num -= daysInYear % TimeConstants.DaysInOneWeek;
    num2 = (firstDayOfWeekIndex - num + 2 * TimeConstants.DaysInOneWeek) % TimeConstants.DaysInOneWeek;
    if (num2 !== 0 && num2 + 1 >= numberOfFullDays) {
      num2 -= TimeConstants.DaysInOneWeek;
    }

    num3 = daysInYear - num2;
  }

  return Math.floor(num3 / TimeConstants.DaysInOneWeek + 1);
}

/**
 * Helper function for `getWeekNumber`.
 * Returns week number for a date.
 * @param date - current selected date.
 * @param firstDayOfWeek - The first day of week (0-6, Sunday = 0)
 * @returns The week's number in the year.
 */
function getFirstDayWeekOfYear(date: Date, firstDayOfWeek: DayOfWeek, adapter: CalendarDateAdapter<Date>): number {
  const num = getDayOfYear(date, adapter) - 1;
  const num2 = adapter.getDay(date) - (num % TimeConstants.DaysInOneWeek);
  const num3 = (num2 - getDayIndex(firstDayOfWeek) + 2 * TimeConstants.DaysInOneWeek) % TimeConstants.DaysInOneWeek;

  return Math.floor((num + num3) / TimeConstants.DaysInOneWeek + 1);
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
  return firstDayOfWeekIndex !== 0 && dateWeekDay < firstDayOfWeekIndex
    ? dateWeekDay + TimeConstants.DaysInOneWeek
    : dateWeekDay;
}

/**
 * Returns the day number for a date in a year:
 * the number of days since January 1st in the particular year.
 * @param date - A date to find the day number for.
 * @returns The day's number in the year.
 */
function getDayOfYear(date: Date, adapter: CalendarDateAdapter<Date>): number {
  const month = adapter.getMonth(date);
  const year = adapter.getYear(date);
  let daysUntilDate = 0;

  for (let i = 0; i < month; i++) {
    daysUntilDate += daysInMonth(i + 1, year, adapter);
  }

  daysUntilDate += adapter.getDate(date);

  return daysUntilDate;
}

/**
 * Returns the number of days in the month
 * @param month - The month number to target (months 1-12).
 * @param year - The year to target.
 * @returns The number of days in the month.
 */
function daysInMonth(month: number, year: number, adapter: CalendarDateAdapter<Date>): number {
  return adapter.getDate(adapter.createDate(year, month, 0));
}
