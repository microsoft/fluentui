import { DayOfWeek, DateRangeType } from '../dateValues/DateValues';
import { assertNever } from '../../Utilities';

const DAYS_IN_WEEK = 7;
const MONTHS_IN_YEAR = 12;

/**
 * Returns a date offset from the given date by the specified number of days.
 * @param {Date} date - The origin date
 * @param {number} days - The number of days to offset. 'days' can be negative.
 * @return {Date} A new Date object offset from the origin date by the given number of days
 */
export function addDays(date: Date, days: number): Date {
  let result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Returns a date offset from the given date by the specified number of weeks.
 * @param {Date} date - The origin date
 * @param {number} weeks - The number of weeks to offset. 'weeks' can be negative.
 * @return {Date} A new Date object offset from the origin date by the given number of weeks
 */
export function addWeeks(date: Date, weeks: number): Date {
  return addDays(date, weeks * DAYS_IN_WEEK);
}

/**
 * Returns a date offset from the given date by the specified number of months.
 * The method tries to preserve the day-of-month; however, if the new month does not have enough days
 * to contain the original day-of-month, we'll use the last day of the new month.
 * @param {Date} date - The origin date
 * @param {number} months - The number of months to offset. 'months' can be negative.
 * @return {Date} A new Date object offset from the origin date by the given number of months
 */
export function addMonths(date: Date, months: number): Date {
  let result = new Date(date.getTime());
  let newMonth = result.getMonth() + months;
  result.setMonth(newMonth);

  // We want to maintain the same day-of-month, but that may not be possible if the new month doesn't have enough days.
  // Loop until we back up to a day the new month has.
  // (Weird modulo math is due to Javascript's treatment of negative numbers in modulo)
  if (result.getMonth() !== ((newMonth % MONTHS_IN_YEAR) + MONTHS_IN_YEAR) % MONTHS_IN_YEAR) {
    result = addDays(result, -result.getDate());
  }
  return result;
}

/**
 * Returns a date offset from the given date by the specified number of years.
 * The method tries to preserve the day-of-month; however, if the new month does not have enough days
 * to contain the original day-of-month, we'll use the last day of the new month.
 * @param {Date} date - The origin date
 * @param {number} years - The number of years to offset. 'years' can be negative.
 * @return {Date} A new Date object offset from the origin date by the given number of years
 */
export function addYears(date: Date, years: number): Date {
  let result = new Date(date.getTime());
  result.setFullYear(date.getFullYear() + years);

  // We want to maintain the same day-of-month, but that may not be possible if the new month doesn't have enough days.
  // Loop until we back up to a day the new month has.
  // (Weird modulo math is due to Javascript's treatment of negative numbers in modulo)
  if (result.getMonth() !== ((date.getMonth() % MONTHS_IN_YEAR) + MONTHS_IN_YEAR) % MONTHS_IN_YEAR) {
    result = addDays(result, -result.getDate());
  }
  return result;
}

/**
 * Returns a date that is a copy of the given date, aside from the month changing to the given month.
 *  The method tries to preserve the day-of-month; however, if the new month does not have enough days
 * to contain the original day-of-month, we'll use the last day of the new month.
 * @param {Date} date - The origin date
 * @param {number} month - The 0-based index of the month to set on the date.
 * @return {Date} A new Date object with the given month set.
 */
export function setMonth(date: Date, month: number): Date {
  return addMonths(date, month - date.getMonth());
}

/**
 * Compares two dates, and returns true if the two dates (not accounting for time-of-day) are equal.
 * @return {boolean} True if the two dates represent the same date (regardless of time-of-day), false otherwise.
 */
export function compareDates(date1: Date, date2: Date): boolean {
  if (!date1 && !date2) {
    return true;
  } else if (!date1 || !date2) {
    return false;
  } else {
    return (date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate());
  }
}

/**
 * Compare the date parts of two dates
 * @param {Date} date1 - The first date to compare
 * @param {Date} date2 - The second date to compare
 * @returns {Number} A negative value if date1 is earlier than date2, 0 if the dates are equal, or a positive value
 * if date1 is later than date2.
 */
export function compareDatePart(date1: Date, date2: Date): Number {
  return getDatePartHashValue(date1) - getDatePartHashValue(date2);
}

/**
 * Gets the date range array including the specified date. The date range array is calculated as the list
 * of dates accounting for the specified first day of the week and date range type.
 * @param {Date} date - The input date
 * @param {DateRangeType} dateRangeType - The desired date range type, i.e., day, week, month, etc.
 * @param {DayOfWeek} dayOfWeek - The first day of the week.
 * @returns {Date[]} An array of dates representing the date range containing the specified date.
 */
export function getDateRangeArray(date: Date, dateRangeType: DateRangeType, firstDayOfWeek: DayOfWeek): Date[] {
  let datesArray = new Array<Date>();
  let startDate: Date;
  let endDate = null;

  switch (dateRangeType) {
    case DateRangeType.Day:
      startDate = getDatePart(date);
      endDate = addDays(startDate, 1);
      break;

    case DateRangeType.Week:
      startDate = getStartDateOfWeek(getDatePart(date), firstDayOfWeek);
      endDate = addDays(startDate, DAYS_IN_WEEK);
      break;

    case DateRangeType.Month:
      startDate = new Date(date.getFullYear(), date.getMonth(), 1);
      endDate = addMonths(startDate, 1);
      break;
    default:
      return assertNever(dateRangeType);
  }

  // Populate the dates array with the dates in range
  datesArray.push(startDate);
  let nextDate = addDays(startDate, 1);
  while (!compareDates(nextDate, endDate)) {
    datesArray.push(nextDate);
    nextDate = addDays(nextDate, 1);
  }

  return datesArray;
}

/**
 * Checks whether the specified date is in the given date range.
 * @param {Date} date - The origin date
 * @param {Date[]} dateRange - An array of dates to do the lookup on
 * @returns {bool} True if the date matches one of the dates in the specified array, false otherwise.
 */
export function isInDateRangeArray(date: Date, dateRange: Date[]): boolean {
  for (let dateInRange of dateRange) {
    if (compareDates(date, dateInRange)) {
      return true;
    }
  }
  return false;
}

/**
 * Gets a new date with the time portion zeroed out, i.e., set to midnight
 * @param {Date} date - The origin date
 * @returns {Date} A new date with the time set to midnight
 */
function getDatePart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Gets the date for the first day of the week based on the given date assuming
 * the specified first day of the week.
 * @param {Date} date - The date to find the beginning of the week date for.
 * @return {Date} A new date object representing the first day of the week containing the input date.
 */
function getStartDateOfWeek(date: Date, firstDayOfWeek: DayOfWeek): Date {
  let daysOffset = firstDayOfWeek - date.getDay();
  if (daysOffset > 0) {
    // If first day of week is > date, go 1 week back, to ensure resulting date is in the past.
    daysOffset -= DAYS_IN_WEEK;
  }
  return addDays(date, daysOffset);
}

/**
 * Helper function to assist in date comparisons
 */
function getDatePartHashValue(date: Date) {
  // Generate date hash value created as sum of Date (up to 31 = 5 bits), Month (up to 11 = 4 bits) and Year.
  /* tslint:disable:no-bitwise */
  return date.getDate() + (date.getMonth() << 5) + (date.getFullYear() << 9);
  /* tslint:enable:no-bitwise */
}

/**
 * Returns week number for a week in a year.
 */
export function getWeekNumbers(weeks: any[], firstDayOfWeek: DayOfWeek, navigatedDate: Date) {

  let firstDayOfMonth = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);

  let getDayofYear = getDayOfYear(addDays(firstDayOfMonth, firstDayOfWeek + 1));

  let firstWeekNumber = Math.ceil(getDayofYear / DAYS_IN_WEEK);

  let weeksArray = [];
  for (let i = 0; i < weeks.length; i++) {
    weeksArray.push(firstWeekNumber + i);
  }

  return weeksArray;
}

/**
 * Returns the day number for a date in a year
 * The number of days since January 1st in the particular year.
 */
export function getDayOfYear(date: Date) {
  let month = date.getMonth();
  let year = date.getFullYear();
  let daysUntilDate = 0;


  for (let i = 0; i < month; i++) {
    daysUntilDate += daysInMonth(i, year);
  }

  daysUntilDate += date.getDate();

  return daysUntilDate;
}

/**
 * Returns the number of days in the month
 */
function daysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}
