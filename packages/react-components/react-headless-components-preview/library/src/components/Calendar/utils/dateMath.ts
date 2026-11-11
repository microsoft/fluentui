import { DAYS_IN_WEEK, DEFAULT_WORK_WEEK_DAYS } from './constants';
import { getDayIndex } from './dateUtils';
import type { DateRangeType, DayOfWeek, FirstWeekOfYear } from './constants';

/**
 * Creates a new Date object with the specified year, month, and day, with the time set to midnight.
 */
export function createDate(year: number, month: number, day: number): Date {
  const date = new Date(0);
  date.setHours(0, 0, 0, 0);
  date.setFullYear(year, month, day);
  return date;
}

type CivilDate = { year: number; month: number; day: number };

/** Advances calendar fields independently of local timezone gaps. */
export function addCivilDays({ year, month, day }: CivilDate, days: number): CivilDate {
  const date = new Date(0);
  date.setUTCFullYear(year, month, day + days);
  return { year: date.getUTCFullYear(), month: date.getUTCMonth(), day: date.getUTCDate() };
}

/** Checks whether a local date preserved the requested calendar fields without normalization. */
export function matchesCivilDate(date: Date, { year, month, day }: CivilDate): boolean {
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;
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
 * @param workWeekDays - The allowed days in work week. Defaults to Monday through Friday.
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
    workWeekDays = [...DEFAULT_WORK_WEEK_DAYS];
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
      if (compareDatePart(date, endDate) >= 0) {
        startDate = addDays(startDate, DAYS_IN_WEEK);
        endDate = addDays(endDate, DAYS_IN_WEEK);
      }
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

  if (!Number.isFinite(endDate.getTime())) {
    throw new RangeError('Date range end is outside the representable date range');
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
 * Returns the week number for a date.
 *
 * @param date - A date to find the week number for.
 * @param firstDayOfWeek - The named day that starts each week.
 * @param firstWeekOfYear - The convention that determines which week is the first week of the year.
 * @returns The week's number in the year.
 */
export function getWeekNumber(date: Date, firstDayOfWeek: DayOfWeek, firstWeekOfYear: FirstWeekOfYear): number {
  // The fewest days of the new year that its first week must contain.
  const minDays = firstWeekOfYear === 'firstFullWeek' ? DAYS_IN_WEEK : firstWeekOfYear === 'firstFourDayWeek' ? 4 : 1;
  const year = date.getFullYear();
  const day = getCivilDayNumber(year, date.getMonth(), date.getDate());
  // The civil day number on which week 1 of `weekYear` starts.
  const getFirstWeekStart = (weekYear: number) => {
    const firstDay = getCivilDayNumber(weekYear, 0, 1);
    // Days from the start of the week to January 1st; day 0 was a Thursday.
    const offset = (((firstDay + 4 - getDayIndex(firstDayOfWeek)) % DAYS_IN_WEEK) + DAYS_IN_WEEK) % DAYS_IN_WEEK;
    return firstDay - offset + (DAYS_IN_WEEK - offset >= minDays ? 0 : DAYS_IN_WEEK);
  };

  // With a minimum, the last days of December can belong to week 1 of the next year.
  if (minDays > 1 && day >= getFirstWeekStart(year + 1)) {
    return 1;
  }
  const firstWeekStart = getFirstWeekStart(year);
  return Math.floor((day - (day < firstWeekStart ? getFirstWeekStart(year - 1) : firstWeekStart)) / DAYS_IN_WEEK) + 1;
}

/** Counts civil days since 1970-01-01, independent of the local timezone. */
function getCivilDayNumber(year: number, month: number, day: number): number {
  const date = new Date(0);
  date.setUTCFullYear(year, month, day);
  return Math.round(date.getTime() / 86400000);
}

/**
 * Gets the date for the first day of the week based on the given date assuming
 * the specified first day of the week.
 * @param date - The date to find the beginning of the week date for.
 * @returns A new date object representing the first day of the week containing the input date.
 */
export function getStartDateOfWeek(date: Date, firstDayOfWeek: DayOfWeek): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const firstDayOfWeekIndex = getDayIndex(firstDayOfWeek);

  for (let daysBack = 0; daysBack < 2 * DAYS_IN_WEEK; daysBack++) {
    const candidate = createDate(year, month, day - daysBack);
    if (!Number.isFinite(candidate.getTime())) {
      throw new RangeError('Cannot align an invalid or out-of-range date.');
    }
    if (candidate.getDay() === firstDayOfWeekIndex) {
      return candidate;
    }
  }

  throw new RangeError('Could not find a representable week start within two weeks.');
}
