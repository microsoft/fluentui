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
