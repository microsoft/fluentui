import { DAYS_IN_WEEK, daysOfWeek } from './constants';
import type { DayOfWeek, FirstWeekOfYear } from './constants';

/** Local calendar fields, independent of whether the date exists in the local timezone. */
export type CivilDate = { year: number; month: number; day: number };

/**
 * Converts a day of the week to the index used by `Date.prototype.getDay()`.
 */
export const getDayIndex = (day: DayOfWeek): number => daysOfWeek.indexOf(day);

/**
 * Converts an index used by `Date.prototype.getDay()` to a day of the week, wrapping out-of-range values.
 * @throws RangeError if the index is not a finite integer.
 */
export const getDayFromIndex = (index: number): DayOfWeek => {
  if (!Number.isInteger(index)) {
    throw new RangeError('index must be a finite integer.');
  }
  return daysOfWeek[((index % DAYS_IN_WEEK) + DAYS_IN_WEEK) % DAYS_IN_WEEK];
};

/**
 * Creates a local date at midnight. Unlike the `Date` constructor, years 0-99 are not mapped to 1900-1999.
 */
export const createDate = (year: number, month: number, day: number): Date => {
  const date = new Date(0);
  date.setHours(0, 0, 0, 0);
  date.setFullYear(year, month, day);
  return date;
};

/** Advances calendar fields independently of local timezone gaps. */
export const addCivilDays = ({ year, month, day }: CivilDate, days: number): CivilDate => {
  const date = new Date(0);
  date.setUTCFullYear(year, month, day + days);
  return { year: date.getUTCFullYear(), month: date.getUTCMonth(), day: date.getUTCDate() };
};

/** Checks whether a local date preserved the requested calendar fields without normalization. */
export const matchesCivilDate = (date: Date, { year, month, day }: CivilDate): boolean =>
  date.getFullYear() === year && date.getMonth() === month && date.getDate() === day;

/**
 * Steps from `date` by `step` civil days until `accept` passes, skipping dates that do not exist in the local
 * timezone. Returns `undefined` past `bound` or the representable date range.
 */
export const findCivilDate = (
  date: Date,
  step: number,
  accept: (candidate: Date) => boolean | undefined,
  bound?: Date,
): Date | undefined => {
  const origin = { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
  for (let offset = step; ; offset += step) {
    const civil = addCivilDays(origin, offset);
    const candidate = createDate(civil.year, civil.month, civil.day);
    if (!Number.isFinite(candidate.getTime()) || (bound && compareDatePart(candidate, bound) * step > 0)) {
      return undefined;
    }
    if (matchesCivilDate(candidate, civil) && accept(candidate)) {
      return candidate;
    }
  }
};

/** Counts civil days since 1970-01-01, independent of the local timezone. */
const getCivilDayNumber = (year: number, month: number, day: number): number => {
  const date = new Date(0);
  date.setUTCFullYear(year, month, day);
  return Math.round(date.getTime() / 86400000);
};

/**
 * Returns a copy of `date` offset by `days`, which can be negative.
 */
export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
};

/**
 * Returns a copy of `date` offset by `months`, which can be negative. The day of the month is kept when the target
 * month has it, otherwise the last day of the target month is used.
 */
export const addMonths = (date: Date, months: number): Date => {
  let result = new Date(date.getTime());
  const targetMonth = result.getMonth() + months;
  result.setMonth(targetMonth);
  if (result.getMonth() !== ((targetMonth % 12) + 12) % 12) {
    result = addDays(result, -result.getDate());
  }
  return result;
};

/**
 * Returns a copy of `date` offset by `years`, which can be negative. February 29 becomes February 28 in a common
 * year.
 */
export const addYears = (date: Date, years: number): Date => {
  let result = new Date(date.getTime());
  result.setFullYear(date.getFullYear() + years);
  if (result.getMonth() !== date.getMonth()) {
    result = addDays(result, -result.getDate());
  }
  return result;
};

/** Returns the first day of the month of `date`. */
export const getMonthStart = (date: Date): Date => createDate(date.getFullYear(), date.getMonth(), 1);

/** Returns the last day of the month of `date`. */
export const getMonthEnd = (date: Date): Date => createDate(date.getFullYear(), date.getMonth() + 1, 0);

/**
 * Returns a copy of `date` in the zero-based `month`, keeping the day of the month as `addMonths` does.
 */
export const setMonth = (date: Date, month: number): Date => addMonths(date, month - date.getMonth());

/**
 * Compares the date parts of two dates, ignoring the time of day.
 * @returns A negative value if `date1` is earlier, 0 if both are the same day, or a positive value if it is later.
 */
export const compareDatePart = (date1: Date, date2: Date): number =>
  date1.getFullYear() - date2.getFullYear() || date1.getMonth() - date2.getMonth() || date1.getDate() - date2.getDate();

/**
 * Returns the first day of the week that contains `date`.
 * @throws RangeError if no representable week start lies within two weeks.
 */
export const getStartDateOfWeek = (date: Date, firstDayOfWeek: DayOfWeek): Date => {
  const firstDayOfWeekIndex = getDayIndex(firstDayOfWeek);
  for (let daysBack = 0; daysBack < 2 * DAYS_IN_WEEK; daysBack++) {
    const candidate = createDate(date.getFullYear(), date.getMonth(), date.getDate() - daysBack);
    if (!Number.isFinite(candidate.getTime())) {
      throw new RangeError('Cannot align an invalid or out-of-range date.');
    }
    if (candidate.getDay() === firstDayOfWeekIndex) {
      return candidate;
    }
  }
  throw new RangeError('Could not find a representable week start within two weeks.');
};

/**
 * Returns the week number of `date`.
 * @param firstWeekOfYear - The convention that determines which week is the first week of the year.
 */
export const getWeekNumber = (date: Date, firstDayOfWeek: DayOfWeek, firstWeekOfYear: FirstWeekOfYear): number => {
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
};
