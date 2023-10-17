import type { TimeFormatOptions } from './TimePicker.types';

function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}

/**
 * Converts a Date object to a string key.
 */
export function dateToKey(date?: Date): string {
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
export function keyToDate(key: string): Date | undefined {
  if (key === '' || key === 'invalid') {
    return undefined;
  }
  const date = new Date(key);
  return isValidDate(date) ? date : undefined;
}

/**
 * Formats a Date object into a time string based on provided options.
 *
 * @param date - The Date object to be formatted.
 * @param options - Formatting options. It has two properties:
 *      1. hour12 (default: false): Determines if the time format should be 12-hour (AM/PM) or 24-hour.
 *      2. showSeconds (default: false): Determines if the seconds should be included in the formatted string.
 * @returns Formatted time string based on the given options.
 *
 * @example
 * const date = new Date(2023, 9, 6, 23, 45, 12);
 * formatDateToTimeString(date);                         // Returns "23:45"
 * formatDateToTimeString(date, { showSeconds: true });  // Returns "23:45:12"
 * formatDateToTimeString(date, { hour12: true, showSeconds: true }); // Returns "11:45:12 PM"
 */
export function formatDateToTimeString(date: Date, options: TimeFormatOptions = {}): string {
  const { hour12 = false, showSeconds = false } = options;
  const timeFormatOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12,
  };

  if (showSeconds) {
    timeFormatOptions.second = '2-digit';
  }

  let formattedTime = date.toLocaleTimeString([], timeFormatOptions);

  // Correct the representation of midnight in 24-hour format, if needed
  if (!hour12 && formattedTime.startsWith('24')) {
    formattedTime = '00' + formattedTime.slice(2);
  }

  return formattedTime;
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

  const result = [];

  const startDate = new Date(dateStartAnchor);
  while (startDate < dateEndAnchor) {
    result.push(new Date(startDate));
    startDate.setMinutes(startDate.getMinutes() + increment);
  }

  return result;
}
