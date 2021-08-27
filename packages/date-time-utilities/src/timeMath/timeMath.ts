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
 * Rounds the date's minute up to the next available increment. For example, if `date` has time 1:21
 * and `increments` is 5, the resulting time will be 1:25.
 * @param date - Date to ceil minutes
 * @param increments - Time increments
 * @returns Date with ceiled minute
 */
export const ceilMinuteToIncrement = (date: Date, increments: number) => {
  const result = new Date(date.getTime());
  let minute = result.getMinutes();
  if (TimeConstants.MinutesInOneHour % increments) {
    result.setMinutes(0);
  } else {
    const times = TimeConstants.MinutesInOneHour / increments;
    for (let i = 1; i <= times; i++) {
      if (minute > increments * (i - 1) && minute <= increments * i) {
        minute = increments * i;
        break;
      }
    }
    result.setMinutes(minute);
  }
  return result;
};
