import { TimeConstants } from '../dateValues/timeConstants';

/**
 * Returns a date offset from the given date by the specified number of minutes.
 * @param date - The origin date
 * @param minutes - The number of minutes to offset. 'minutes' can be negative.
 * @returns A new Date object offset from the origin date by the given number of minutes
 */
export const addMinutes = (date: Date, minutes: number): Date => {
  const result = new Date(date.getTime());
  result.setTime(result.getTime() + minutes * TimeConstants.MinutesInOneHour * TimeConstants.MillisecondsIn1Sec);
  return result;
};

/**
 * Returns the earliest available minute based on the increments
 * @param minute - Minute to ceil
 * @param increments - Time increments
 * @returns Ceiled minute
 */
export const ceilMinute = (minute: number, increments: number) => {
  if (TimeConstants.MinutesInOneHour % increments || minute === 0) {
    return 0;
  } else {
    const times = TimeConstants.MinutesInOneHour / increments;
    for (let i = 1; i <= times; i++) {
      if (minute > increments * (i - 1) && minute <= increments * i) {
        return increments * i;
      }
    }
  }
};
