import { compareDatePart } from '../dateMath/dateMath';
import type { IRestrictedDatesOptions } from './dateGrid.types';

/**
 * Checks if `date` happens later than max date
 * @param date - date to check
 * @param options - object with max date to check against
 */
export const isAfterMaxDate = (date: Date, options: IRestrictedDatesOptions): boolean => {
  const { maxDate } = options;
  return maxDate ? compareDatePart(date, maxDate) >= 1 : false;
};
