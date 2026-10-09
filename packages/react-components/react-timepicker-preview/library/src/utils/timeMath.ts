import type { HourCycle, TimeFormatOptions, TimeStringValidationResult } from './types';

function isValidDate(date: Date): boolean {
  return !isNaN(date.getTime());
}

/**
 * Returns the option key for a date: its ISO string, `''` for null, or `'invalid'` for an invalid date.
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
 * Inverse of `dateToKey`. Returns null for empty or invalid keys.
 */
export function keyToDate(key: string): Date | null {
  if (key === '' || key === 'invalid') {
    return null;
  }
  const date = new Date(key);
  return isValidDate(date) ? date : null;
}

/**
 * Returns the hour cycle used for formatting and parsing: `hourCycle` when set, otherwise the hour cycle of the
 * runtime locale.
 */
export function getResolvedHourCycle(hourCycle?: HourCycle): HourCycle {
  if (hourCycle) {
    return hourCycle;
  }
  // `hourCycle` is only part of the resolved options when the hour is requested.
  // `hourCycle` is missing from the resolved options type in the TypeScript lib this package targets.
  const resolved = (new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions() as { hourCycle?: string })
    .hourCycle;
  return resolved === 'h11' || resolved === 'h12' || resolved === 'h24' ? resolved : 'h23';
}

/**
 * Formats the time of a date in the user's locale.
 *
 * @example
 * const date = new Date(2023, 9, 6, 23, 45, 12);
 * formatDateToTimeString(date); // "23:45" in CET
 * formatDateToTimeString(date, \{ hourCycle: 'h12', showSeconds: true \}); // "11:45:12 PM" in CET
 */
export function formatDateToTimeString(date: Date, { hourCycle, showSeconds }: TimeFormatOptions = {}): string {
  return date.toLocaleTimeString(undefined, {
    hour: 'numeric',
    hourCycle: getResolvedHourCycle(hourCycle),
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
  });
}

/**
 * Returns `dateAnchor` with the time set to `startHour`:00.
 */
export function getDateStartAnchor(dateAnchor: Date, startHour: number): Date {
  const startDate = new Date(dateAnchor);
  startDate.setHours(startHour, 0, 0, 0);
  return startDate;
}

/**
 * Returns `dateAnchor` with the time set to `endHour`:00. Rolls over to the next day when `endHour` is 24
 * or less than `startHour`.
 */
export function getDateEndAnchor(dateAnchor: Date, startHour: number, endHour: number): Date {
  const endDate = new Date(dateAnchor);
  if (startHour > endHour || endHour === 24) {
    endDate.setDate(endDate.getDate() + 1);
  }
  endDate.setHours(endHour === 24 ? 0 : endHour, 0, 0, 0);
  return endDate;
}

const MS_PER_MINUTE = 60_000;

/**
 * Returns the dates from `dateStartAnchor` (inclusive) to `dateEndAnchor` (exclusive), `increment` minutes of
 * elapsed time apart. The spacing is preserved across daylight saving transitions.
 *
 * `increment` must be a finite positive integer; for any other value no dates are returned.
 *
 * @example
 * getTimesBetween(new Date(2023, 0, 1, 10), new Date(2023, 0, 1, 11), 15); // 10:00, 10:15, 10:30, 10:45
 */
export function getTimesBetween(dateStartAnchor: Date, dateEndAnchor: Date, increment: number): Date[] {
  if (!Number.isInteger(increment) || increment <= 0) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`TimePicker: increment must be a finite positive integer, received ${increment}.`);
    }
    return [];
  }

  const result: Date[] = [];
  const end = dateEndAnchor.getTime();

  for (let time = dateStartAnchor.getTime(); time < end; time += increment * MS_PER_MINUTE) {
    result.push(new Date(time));
  }

  return result;
}

const HOUR_PATTERNS: Record<HourCycle, string> = {
  h11: '(0?\\d|1[01])',
  h12: '(0?[1-9]|1[0-2])',
  h23: '([01]?\\d|2[0-3])',
  h24: '(0?[1-9]|1\\d|2[0-4])',
};
const MS_PER_HOUR = 3_600_000;

function getTimeRegex(hourCycle: HourCycle, showSeconds: boolean): RegExp {
  const hour12 = hourCycle === 'h11' || hourCycle === 'h12';
  // The seconds group is always present (empty without `showSeconds`) so the capture indices do not change.
  const seconds = showSeconds ? ':([0-5]\\d)' : '()';
  const dayPeriod = hour12 ? ' ([AaPp][Mm])' : '()';
  return new RegExp(`^${HOUR_PATTERNS[hourCycle]}:([0-5]\\d)${seconds}${dayPeriod}$`);
}

/**
 * Returns the first instant on the day of `day` (or the next day) with the given clock fields that is not before
 * `dateStartAnchor`. A clock time that occurs twice because of a daylight saving transition resolves to the
 * occurrence inside the range; a clock time that does not exist on a day is skipped.
 */
function getDateInRange(dateStartAnchor: Date, hours: number, minutes: number, seconds: number): Date | null {
  for (let dayOffset = 0; dayOffset <= 1; dayOffset++) {
    const candidate = new Date(
      dateStartAnchor.getFullYear(),
      dateStartAnchor.getMonth(),
      dateStartAnchor.getDate() + dayOffset,
      hours,
      minutes,
      seconds,
      0,
    );
    const later = new Date(candidate.getTime() + MS_PER_HOUR);
    const occurrences = [candidate, later].filter(
      date => date.getHours() === hours && date.getMinutes() === minutes && date.getSeconds() === seconds,
    );
    const inRange = occurrences.find(date => date >= dateStartAnchor);
    if (inRange) {
      return inRange;
    }
  }
  return null;
}

/**
 * Parses a time string (e.g. "2:30 PM", "15:45:20") into a date between the anchors.
 * The accepted format depends on the resolved hour cycle, see `getResolvedHourCycle`.
 * A time before `dateStartAnchor` is moved to the next day.
 *
 * @returns the parsed date, and an `errorType` when the string is empty, invalid or out of bounds
 */
export function getDateFromTimeString(
  time: string | undefined,
  dateStartAnchor: Date,
  dateEndAnchor: Date,
  timeFormatOptions: TimeFormatOptions,
): TimeStringValidationResult {
  const trimmedTime = time?.trim();
  if (!trimmedTime) {
    return { date: null, errorType: 'required-input' };
  }

  const hourCycle = getResolvedHourCycle(timeFormatOptions.hourCycle);
  const showSeconds = !!timeFormatOptions.showSeconds;
  const match = getTimeRegex(hourCycle, showSeconds).exec(trimmedTime);
  if (!match) {
    return { date: null, errorType: 'invalid-input' };
  }

  const [, hourText, minuteText, secondText, dayPeriod] = match;
  let hours = +hourText;
  const minutes = +minuteText;
  const seconds = secondText ? +secondText : 0;

  if (hourCycle === 'h24' && hours === 24) {
    hours = 0;
  } else if (hourCycle === 'h12' && dayPeriod) {
    const isPm = dayPeriod.toLowerCase() === 'pm';
    hours = isPm && hours !== 12 ? hours + 12 : !isPm && hours === 12 ? 0 : hours;
  } else if (hourCycle === 'h11' && dayPeriod) {
    hours = dayPeriod.toLowerCase() === 'pm' ? hours + 12 : hours;
  }

  const date = getDateInRange(dateStartAnchor, hours, minutes, seconds);
  if (!date) {
    return { date: null, errorType: 'invalid-input' };
  }

  if (date >= dateEndAnchor) {
    return { date, errorType: 'out-of-bounds' };
  }

  return { date };
}
