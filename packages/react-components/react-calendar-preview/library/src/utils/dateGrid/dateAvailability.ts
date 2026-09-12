import { addDays, compareDatePart } from '../dateMath';
import type { AvailableDateOptions, RestrictedDatesOptions } from './dateGrid.types';

/**
 * Checks if a date is after the maximum allowed date based on the given restrictions.
 */
const isAfterMaxDate = (date: Date, options: RestrictedDatesOptions): boolean => {
  const { maxDate } = options;
  return maxDate ? compareDatePart(date, maxDate) >= 1 : false;
};

/**
 * Checks if a date is before the minimum allowed date based on the given restrictions.
 */
const isBeforeMinDate = (date: Date, options: RestrictedDatesOptions): boolean => {
  const { minDate } = options;
  return minDate ? compareDatePart(minDate, date) >= 1 : false;
};

/**
 * Checks if `date` falls into the restricted `options`
 * @param date - date to check
 * @param options - restriction options (min date, max date and list of restricted dates)
 */
export const isRestrictedDate = (date: Date, options: RestrictedDatesOptions): boolean => {
  const { restrictedDates, minDate, maxDate } = options;
  if (!restrictedDates && !minDate && !maxDate) {
    return false;
  }
  const inRestrictedDates = restrictedDates && restrictedDates.some((rd: Date) => compareDatePart(rd, date) === 0);
  return inRestrictedDates || isBeforeMinDate(date, options) || isAfterMaxDate(date, options);
};

/**
 * Returns closest available date given the restriction `options`, or undefined otherwise
 * @param options - list of search options
 */
export const findAvailableDate = (options: AvailableDateOptions): Date | undefined => {
  const { targetDate, initialDate, direction, ...restrictionOptions } = options;
  let availableDate = targetDate;
  // if the target date is available, return it immediately
  if (!isRestrictedDate(targetDate, restrictionOptions)) {
    return targetDate;
  }

  while (
    compareDatePart(initialDate, availableDate) !== 0 &&
    isRestrictedDate(availableDate, restrictionOptions) &&
    !isAfterMaxDate(availableDate, restrictionOptions) &&
    !isBeforeMinDate(availableDate, restrictionOptions)
  ) {
    availableDate = addDays(availableDate, direction);
  }

  if (compareDatePart(initialDate, availableDate) !== 0 && !isRestrictedDate(availableDate, restrictionOptions)) {
    return availableDate;
  }

  return undefined;
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
    boundedDateRange = boundedDateRange.filter(date => compareDatePart(date, minDate) >= 0);
  }
  if (maxDate) {
    boundedDateRange = boundedDateRange.filter(date => compareDatePart(date, maxDate) <= 0);
  }
  return boundedDateRange;
};
