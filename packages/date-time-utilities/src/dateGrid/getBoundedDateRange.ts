import { compareDatePart } from '../dateMath/dateMath';

/**
 * Generates a list of dates, bounded by min and max dates
 * @param dateRange - input date range
 * @param minDate - min date to limit the range
 * @param maxDate - max date to limit the range
 */
export const getBoundedDateRange = (dateRange: Date[], minDate?: Date, maxDate?: Date): Date[] => {
  let boundedDateRange = [...dateRange];
  const zeroVal: Number = Number(0);
  if (minDate) {
    boundedDateRange = boundedDateRange.filter((date: Date) => compareDatePart(date, minDate as Date) >= zeroVal);
  }
  if (maxDate) {
    boundedDateRange = boundedDateRange.filter((date: Date) => compareDatePart(date, maxDate as Date) <= zeroVal);
  }
  return boundedDateRange;
};
