import { IAvailableDateOptions } from './dateGrid.types';

import { isRestrictedDate } from './isRestrictedDate';

import { isAfterMaxDate } from './isAfterMaxDate';

import { isBeforeMinDate } from './isBeforeMinDate';
import { compareDatePart, addDays } from '../dateMath/dateMath';

/**
 * Returns closest available date given the restriction `options`, or undefined otherwise
 * @param options - list of search options
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
