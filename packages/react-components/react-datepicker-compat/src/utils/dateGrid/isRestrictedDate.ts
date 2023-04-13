import { RestrictedDatesOptions } from './dateGrid.types';
import { compareDates } from '../dateMath/dateMath';
import { isBeforeMinDate } from './isBeforeMinDate';
import { isAfterMaxDate } from './isAfterMaxDate';

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
  const inRestrictedDates = restrictedDates && restrictedDates.some((rd: Date) => compareDates(rd, date));
  return inRestrictedDates || isBeforeMinDate(date, options) || isAfterMaxDate(date, options);
};
