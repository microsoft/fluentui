import { addDays, compareDatePart } from './dateMath';

/** Date bounds and restrictions. */
export type RestrictedDatesOptions = {
  /** The earliest available date. */
  minDate?: Date;
  /** The latest available date. */
  maxDate?: Date;
  /** Dates that cannot be selected. */
  restrictedDates?: Date[];
};

/** Options for `findAvailableDate`. */
export type AvailableDateOptions = RestrictedDatesOptions & {
  /** The date the search started from; reaching it again ends the search. */
  initialDate: Date;
  /** The preferred date. */
  targetDate: Date;
  /** The search direction: `1` searches forwards, `-1` backwards. */
  direction: 1 | -1;
};

const isAfterMaxDate = (date: Date, { maxDate }: RestrictedDatesOptions): boolean =>
  !!maxDate && compareDatePart(date, maxDate) > 0;

const isBeforeMinDate = (date: Date, { minDate }: RestrictedDatesOptions): boolean =>
  !!minDate && compareDatePart(minDate, date) > 0;

/**
 * Whether `date` is outside the inclusive bounds or is a restricted date.
 */
export const isRestrictedDate = (date: Date, options: RestrictedDatesOptions): boolean =>
  !!options.restrictedDates?.some(restricted => compareDatePart(restricted, date) === 0) ||
  isBeforeMinDate(date, options) ||
  isAfterMaxDate(date, options);

/** Filters out unavailable dates, preserving the order of the others. */
export const getAvailableDates = (dates: Date[], options: RestrictedDatesOptions): Date[] =>
  dates.filter(date => !isRestrictedDate(date, options));

/**
 * Returns the closest available date to `targetDate` in `direction`, or `undefined` when the search reaches the
 * initial date or a bound first.
 * @throws RangeError if the direction is not 1 or -1, or the search dates cannot be represented.
 */
export const findAvailableDate = (options: AvailableDateOptions): Date | undefined => {
  const { targetDate, initialDate, direction, ...restrictions } = options;
  if (direction !== 1 && direction !== -1) {
    throw new RangeError('direction must be 1 or -1.');
  }
  if (!Number.isFinite(targetDate.getTime()) || !Number.isFinite(initialDate.getTime())) {
    throw new RangeError('targetDate and initialDate must be valid.');
  }
  if (!isRestrictedDate(targetDate, restrictions)) {
    return targetDate;
  }

  let availableDate = targetDate;
  let daysOffset = 0;
  while (
    compareDatePart(initialDate, availableDate) !== 0 &&
    isRestrictedDate(availableDate, restrictions) &&
    !isAfterMaxDate(availableDate, restrictions) &&
    !isBeforeMinDate(availableDate, restrictions)
  ) {
    // Offsets are applied to the target, so a skipped local date cannot normalize back to the previous candidate.
    daysOffset += direction;
    availableDate = addDays(targetDate, daysOffset);
    if (!Number.isFinite(availableDate.getTime())) {
      throw new RangeError('Cannot search for an out-of-range date.');
    }
  }
  return compareDatePart(initialDate, availableDate) !== 0 && !isRestrictedDate(availableDate, restrictions)
    ? availableDate
    : undefined;
};
