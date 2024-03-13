import { IRestrictedDatesOptions } from './dateGrid.types';
import { compareDatePart } from '../dateMath/dateMath';

/**
 * Checks if `date` happens later than max date
 * @param date - date to check
 * @param options - object with max date to check against
 */
export const isAfterMaxDate = (date: Date, options: IRestrictedDatesOptions): boolean => {
  const { maxDate } = options;
  const oneVal: Number = Number(1);
  return maxDate ? compareDatePart(date, maxDate) >= oneVal : false;
};
