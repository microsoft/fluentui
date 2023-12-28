import type { TimeFormatOptions, TimeStringValidationResult } from './TimePicker.types';

function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}

/**
 * Converts a Date object to a string key.
 */
export function dateToKey(date: Date | null): string {
  if (!date) {
    return '';
  }
  if (!isValidDate(date)) {
    return 'invalid';
  }
  return date.toISOString();
}

/**
 * Converts a string key back to a Date object.
 * Returns undefined for keys that don't represent valid dates.
 */
export function keyToDate(key: string): Date | null {
  if (key === '' || key === 'invalid') {
    return null;
  }
  const date = new Date(key);
  return isValidDate(date) ? date : null;
}

/**
 * Formats a Date object into a time string based on provided options.
 *
 * @param date - The Date object to be formatted.
 * @param options - Formatting options. It has two properties:
 *      1. hourCycle (default: undefined): Determines if the time format should be 12-hour or 24-hour.
 *      2. showSeconds (default: false): Determines if the seconds should be included in the formatted string.
 * @returns Formatted time string based on the given options.
 *
 * @example
 * const date = new Date(2023, 9, 6, 23, 45, 12);
 * formatDateToTimeString(date);                         // Returns "23:45" in CET
 * formatDateToTimeString(date, \{ showSeconds: true \});  // Returns "23:45:12" in CET
 * formatDateToTimeString(date, \{ hourCycle: 'h12', showSeconds: true \}); // Returns "11:45:12 PM" in CET
 */
export function formatDateToTimeString(date: Date, { hourCycle, showSeconds }: TimeFormatOptions = {}): string {
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    hourCycle,
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
  });
}

/**
 * Get the start date anchor based on the provided parameters.
 * @example
 * const date = new Date(2023, 9, 6); // October 6, 2023
 * getStartAnchorDate(date, 5);       // Returns a date for October 6, 2023, 05:00:00
 */
export function getDateStartAnchor(dateAnchor: Date, startHour: number): Date {
  const startDate = new Date(dateAnchor);
  startDate.setHours(startHour, 0, 0, 0);
  return startDate;
}

/**
 * Get the end date anchor based on the provided parameters.
 * @example
 * const date = new Date(2023, 9, 6); // October 6, 2023
 * getEndAnchorDate(date, 5, 10);     // Returns a date for October 6, 2023, 10:00:00
 * getEndAnchorDate(date, 10, 5);     // Returns a date for October 7, 2023, 05:00:00 (next day due to hour conditions)
 */
export function getDateEndAnchor(dateAnchor: Date, startHour: number, endHour: number): Date {
  const endDate = new Date(dateAnchor);
  if (startHour > endHour || endHour === 24) {
    endDate.setDate(endDate.getDate() + 1);
  }
  endDate.setHours(endHour === 24 ? 0 : endHour, 0, 0, 0);
  return endDate;
}

/**
 * Generates an array of Date objects between two given Date anchors.
 *
 * @param dateStartAnchor - The starting Date anchor.
 * @param dateEndAnchor - The ending Date anchor.
 * @param increment - The minute increment between each Date in the resulting array.
 * @returns - An array of Date objects.
 *
 * @example
 * const start = new Date(2023, 0, 1, 10, 0); // Jan 1, 2023 10:00:00 AM
 * const end = new Date(2023, 0, 1, 11, 0);   // Jan 1, 2023 11:00:00 AM
 * getTimesBetween(start, end, 15);      // Returns array with Dates [10:00, 10:15, 10:30, 10:45]
 */
export function getTimesBetween(dateStartAnchor: Date, dateEndAnchor: Date, increment: number) {
  if (increment <= 0) {
    // eslint-disable-next-line no-console
    console.error('Increment value should be a positive number.');
    return [];
  }

  const result: Date[] = [];

  const startDate = new Date(dateStartAnchor);
  while (startDate < dateEndAnchor) {
    result.push(new Date(startDate));
    startDate.setMinutes(startDate.getMinutes() + increment);
  }

  return result;
}

const REGEX_SHOW_SECONDS_HOUR_12 = /^((1[0-2]|0?[0-9]):([0-5][0-9]):([0-5][0-9])\s([AaPp][Mm]))$/;
const REGEX_HIDE_SECONDS_HOUR_12 = /^((1[0-2]|0?[0-9]):[0-5][0-9]\s([AaPp][Mm]))$/;
const REGEX_SHOW_SECONDS_HOUR_24 = /^([0-1]?[0-9]|2[0-4]):[0-5][0-9]:[0-5][0-9]$/;
const REGEX_HIDE_SECONDS_HOUR_24 = /^([0-1]?[0-9]|2[0-4]):[0-5][0-9]$/;

/**
 * Calculates a new date from the user-selected time string based on anchor dates.
 * Returns an object containing a date if the provided time string is valid, and an optional string indicating the type of error.
 *
 * @param time - The time string to be parsed (e.g., "2:30 PM", "15:45:20").
 * @param dateStartAnchor - The start anchor date.
 * @param dateEndAnchor - The end anchor date.
 * @param timeFormatOptions - format options for the provided time string.
 * @returns An object with either a 'date' or an 'errorType'.
 *
 * @example
 * Input: time="2:30 PM", dateStartAnchor=2023-10-06T12:00:00Z, dateEndAnchor=2023-10-07T12:00:00Z, options={hourCycle: 'h12', showSeconds: false}
 * Output: { date: 2023-10-06T14:30:00Z }
 *
 * Input: time="25:30"
 * Output: { errorType: 'invalid-input' }
 *
 * Input: time="1:30 AM", dateStartAnchor=2023-10-06T03:00:00Z, dateEndAnchor=2023-10-07T03:00:00Z, options={hourCycle: 'h12', showSeconds: false}
 * Output: { date: 2023-10-07T01:30:00Z, errorType: 'out-of-bounds' }
 */
export function getDateFromTimeString(
  time: string | undefined,
  dateStartAnchor: Date,
  dateEndAnchor: Date,
  timeFormatOptions: TimeFormatOptions,
): TimeStringValidationResult {
  if (!time) {
    return { date: null, errorType: 'required-input' };
  }

  const { hourCycle, showSeconds } = timeFormatOptions;
  const hour12 = hourCycle === 'h11' || hourCycle === 'h12';

  // Determine the regex based on format
  const regex = hour12
    ? showSeconds
      ? REGEX_SHOW_SECONDS_HOUR_12
      : REGEX_HIDE_SECONDS_HOUR_12
    : showSeconds
    ? REGEX_SHOW_SECONDS_HOUR_24
    : REGEX_HIDE_SECONDS_HOUR_24;

  if (!regex.test(time)) {
    return { date: null, errorType: 'invalid-input' };
  }

  const timeParts = /^(\d\d?):(\d\d):?(\d\d)? ?([ap]m)?/i.exec(time);
  if (!timeParts) {
    return { date: null, errorType: 'invalid-input' };
  }

  const [, selectedHours, minutes, seconds, amPm] = timeParts;
  let hours = selectedHours;

  // Adjust for 12-hour time format if needed
  if (hour12 && amPm) {
    if (amPm.toLowerCase() === 'pm' && +hours !== 12) {
      hours = (+hours + 12).toString();
    } else if (amPm.toLowerCase() === 'am' && +hours === 12) {
      hours = '0';
    }
  }

  const adjustedDate = new Date(dateStartAnchor);
  adjustedDate.setHours(+hours, +minutes, seconds ? +seconds : 0);

  // Adjust to the next day if the selected time is before the anchor time
  if (adjustedDate < dateStartAnchor) {
    adjustedDate.setDate(adjustedDate.getDate() + 1);
  }

  if (adjustedDate >= dateEndAnchor) {
    return { date: adjustedDate, errorType: 'out-of-bounds' };
  }

  return { date: adjustedDate };
}
