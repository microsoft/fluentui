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
 * @param date - Date to ceil minutes
 * @param increments - Time increments
 * @returns Date with ceiled minute
 */
export const ceilMinuteToIncrement = (date: Date, increments: number) => {
  let minute = date.getMinutes();
  if (TimeConstants.MinutesInOneHour % increments) {
    date.setMinutes(0);
  } else {
    const times = TimeConstants.MinutesInOneHour / increments;
    for (let i = 1; i <= times; i++) {
      if (minute > increments * (i - 1) && minute <= increments * i) {
        minute = increments * i;
        break;
      }
    }
    date.setMinutes(minute);
  }
  return date;
};
