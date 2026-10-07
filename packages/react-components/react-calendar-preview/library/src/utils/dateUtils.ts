import { DAYS_IN_WEEK, daysOfWeek, monthsOfYear } from './constants';
import type { DayOfWeek, MonthOfYear } from './constants';

/**
 * Converts a day of the week to the index used by `Date.prototype.getDay()`.
 */
export function getDayIndex(day: DayOfWeek): number {
  return daysOfWeek.indexOf(day);
}

/**
 * Converts an index used by `Date.prototype.getDay()` to a day of the week, wrapping out-of-range values.
 */
export function getDayFromIndex(index: number): DayOfWeek {
  if (!Number.isFinite(index) || !Number.isInteger(index)) {
    throw new RangeError('index must be a finite integer.');
  }

  return daysOfWeek[((index % DAYS_IN_WEEK) + DAYS_IN_WEEK) % DAYS_IN_WEEK];
}

/**
 * Converts a month to the index used by `Date.prototype.getMonth()`.
 */
export function getMonthIndex(month: MonthOfYear): number {
  return monthsOfYear.indexOf(month);
}
