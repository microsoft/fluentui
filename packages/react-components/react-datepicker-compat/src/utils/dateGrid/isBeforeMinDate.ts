import { RestrictedDatesOptions } from './dateGrid.types';
import { compareDatePart } from '../dateMath/dateMath';

/**
 * Checks if `date` happens earlier than min date
 * @param date - date to check
 * @param options - object with min date to check against
 */
export const isBeforeMinDate = (date: Date, options: RestrictedDatesOptions): boolean => {
  const { minDate } = options;
  return minDate ? compareDatePart(minDate, date) >= 1 : false;
};
