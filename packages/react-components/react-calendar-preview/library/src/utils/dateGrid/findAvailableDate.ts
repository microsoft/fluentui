import type { AvailableDateOptions } from './dateGrid.types';

import { isRestrictedDate } from './isRestrictedDate';

import { isAfterMaxDate } from './isAfterMaxDate';

import { isBeforeMinDate } from './isBeforeMinDate';
import { compareDatePart, addDays } from '../dateMath/dateMath';
import { dateAdapter as calendarDateAdapter } from '../dateAdapter';

/**
 * Returns closest available date given the restriction `options`, or undefined otherwise
 * @param options - list of search options
 */
export const findAvailableDate = (options: AvailableDateOptions): Date | undefined => {
  const { targetDate, initialDate, direction, dateAdapter, ...restrictedDateOptions } = options;
  const adapter = dateAdapter ?? calendarDateAdapter;
  const restrictionOptions = { ...restrictedDateOptions, dateAdapter: adapter };
  let availableDate = targetDate;
  // if the target date is available, return it immediately
  if (!isRestrictedDate(targetDate, restrictionOptions)) {
    return targetDate;
  }

  while (
    compareDatePart(initialDate, availableDate, adapter) !== 0 &&
    isRestrictedDate(availableDate, restrictionOptions) &&
    !isAfterMaxDate(availableDate, restrictionOptions) &&
    !isBeforeMinDate(availableDate, restrictionOptions)
  ) {
    availableDate = addDays(availableDate, direction, adapter);
  }

  if (
    compareDatePart(initialDate, availableDate, adapter) !== 0 &&
    !isRestrictedDate(availableDate, restrictionOptions)
  ) {
    return availableDate;
  }

  return undefined;
};
