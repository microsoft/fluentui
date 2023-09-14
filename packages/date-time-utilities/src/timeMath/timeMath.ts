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

/**
 * Returns a date object from the selected time.
 * @param useHour12 - If the time picker uses 12 or 24 hour formatting
 * @param dateStartAnchor - The baseline date to calculate the offset of the selected time
 * @param selectedTime - A string representing the user selected time
 * @returns A new date object offset from the baseDate using the selected time.
 */
export const getDateFromTimeSelection = (useHour12: boolean, dateStartAnchor: Date, selectedTime: string): Date => {
  const [, selectedHours, selectedMinutes, selectedSeconds, selectedAp] =
    TimeConstants.TimeFormatRegex.exec(selectedTime) || [];

  let hours = +selectedHours;
  const minutes = +selectedMinutes;
  const seconds = selectedSeconds ? +selectedSeconds : 0;

  if (useHour12 && selectedAp) {
    if (selectedAp.toLowerCase() === 'pm' && hours !== TimeConstants.OffsetTo24HourFormat) {
      hours += TimeConstants.OffsetTo24HourFormat;
    } else if (selectedAp.toLowerCase() === 'am' && hours === TimeConstants.OffsetTo24HourFormat) {
      hours -= TimeConstants.OffsetTo24HourFormat;
    }
  }

  let hoursOffset;
  if (
    dateStartAnchor.getHours() > hours ||
    (dateStartAnchor.getHours() === hours && dateStartAnchor.getMinutes() > minutes)
  ) {
    hoursOffset = TimeConstants.HoursInOneDay - dateStartAnchor.getHours() + hours;
  } else {
    hoursOffset = Math.abs(dateStartAnchor.getHours() - hours);
  }

  const offset =
    TimeConstants.MillisecondsIn1Sec * TimeConstants.MinutesInOneHour * hoursOffset * TimeConstants.SecondsInOneMinute +
    seconds * TimeConstants.MillisecondsIn1Sec;

  const date = new Date(dateStartAnchor.getTime() + offset);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  return date;
};
