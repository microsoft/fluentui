import type { HourCycle, TimeFormatOptions, TimeStringValidationResult } from './types';

const MS_PER_MINUTE = 60_000;
const MAX_DST_SHIFT_MS = 3 * 60 * MS_PER_MINUTE;
const HOUR_RANGES: Record<HourCycle, [number, number]> = { h11: [0, 11], h12: [1, 12], h23: [0, 23], h24: [1, 24] };
const BIDI_MARKS = /[\u200E\u200F\u061C]/g;
const NO_BREAK_SPACES = /[\u00A0\u202F]/g;

type TimeParser = {
  regex: RegExp;
  normalize: (text: string) => string;
  pmTexts: string[];
  hourRange: [number, number];
};

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
  return isValidDate(date) ? date.toISOString() : 'invalid';
}

/**
 * Inverse of `dateToKey`. Returns null for empty or invalid keys.
 */
export function keyToDate(key: string): Date | null {
  const date = new Date(key);
  return isValidDate(date) ? date : null;
}

/**
 * Formats and parses times in the runtime locale with one shared `Intl.DateTimeFormat`.
 */
export type TimeFormat = {
  /** The resolved hour cycle: `hourCycle` when set, otherwise the hour cycle of the runtime locale. */
  hourCycle: HourCycle;

  /** Formats the time of a date, see `formatDateToTimeString`. */
  format: (date: Date) => string;

  /** Parses a time string into a date between the anchors, see `getDateFromTimeString`. */
  parse: (time: string | undefined, dateStartAnchor: Date, dateEndAnchor: Date) => TimeStringValidationResult;
};

/**
 * Creates the formatter and parser for a configuration. The parser accepts the formatter's own output in any locale.
 */
export function createTimeFormat({ hourCycle, showSeconds }: TimeFormatOptions = {}): TimeFormat {
  const formatter = new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    hourCycle,
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
  });
  const resolvedOptions = formatter.resolvedOptions() as Intl.ResolvedDateTimeFormatOptions & { hourCycle?: string };
  const resolvedHourCycle = toHourCycle(resolvedOptions.hourCycle);
  let parser: TimeParser | undefined;

  return {
    hourCycle: resolvedHourCycle,
    format: date => formatter.format(date),
    parse: (time, dateStartAnchor, dateEndAnchor) => {
      parser ??= createTimeParser(formatter, resolvedOptions, resolvedHourCycle);
      return parseTime(parser, time, dateStartAnchor, dateEndAnchor);
    },
  };
}

/**
 * Formats the time of a date in the user's locale. Use `createTimeFormat` to format many dates.
 *
 * @example
 * const date = new Date(2023, 9, 6, 23, 45, 12);
 * formatDateToTimeString(date); // "23:45" in CET
 * formatDateToTimeString(date, \{ hourCycle: 'h12', showSeconds: true \}); // "11:45:12 PM" in CET
 */
export function formatDateToTimeString(date: Date, timeFormatOptions?: TimeFormatOptions): string {
  return createTimeFormat(timeFormatOptions).format(date);
}

/**
 * Parses a time string (e.g. "2:30 PM", "15:45:20") into a date between the anchors.
 * It accepts the output of `formatDateToTimeString` with the same options in the runtime locale, and `:` as a
 * separator. A time before `dateStartAnchor` is moved to the next day. Use `createTimeFormat` to parse many strings.
 *
 * @returns the parsed date, and an `errorType` when the string is empty, invalid or out of bounds
 */
export function getDateFromTimeString(
  time: string | undefined,
  dateStartAnchor: Date,
  dateEndAnchor: Date,
  timeFormatOptions: TimeFormatOptions,
): TimeStringValidationResult {
  return createTimeFormat(timeFormatOptions).parse(time, dateStartAnchor, dateEndAnchor);
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
  endDate.setHours(endHour % 24, 0, 0, 0);
  return endDate;
}

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
  const step = increment * MS_PER_MINUTE;
  for (let time = dateStartAnchor.getTime(); time < end; time += step) {
    result.push(new Date(time));
  }
  return result;
}

function toHourCycle(hourCycle: string | undefined): HourCycle {
  return hourCycle === 'h11' || hourCycle === 'h12' || hourCycle === 'h24' ? hourCycle : 'h23';
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Builds a pattern from the parts the formatter produces, so the parser accepts the locale's field order, separators,
 * day periods and digits. A separator also accepts `:`, and a day period also accepts `AM` or `PM`.
 */
function createTimeParser(
  formatter: Intl.DateTimeFormat,
  { locale, numberingSystem }: Intl.ResolvedDateTimeFormatOptions,
  hourCycle: HourCycle,
): TimeParser {
  const localDigits = new Intl.NumberFormat(locale, { numberingSystem, useGrouping: false });
  const digits = new Map<string, string>();
  for (let digit = 0; digit <= 9; digit++) {
    digits.set(localDigits.format(digit), `${digit}`);
  }
  const normalize = (text: string) =>
    text
      .replace(BIDI_MARKS, '')
      .replace(NO_BREAK_SPACES, ' ')
      .replace(/./gu, char => digits.get(char) ?? char);

  const formatParts = (hours: number) =>
    formatter
      .formatToParts(new Date(2000, 0, 1, hours, 10, 10))
      .map(part => ({ ...part, value: normalize(part.value) }));
  const pmParts = formatParts(13);
  const getDayPeriod = (parts: Intl.DateTimeFormatPart[]) => parts.find(part => part.type === 'dayPeriod')?.value ?? '';
  const pmTexts = [getDayPeriod(pmParts), 'pm'];
  const dayPeriods = [getDayPeriod(formatParts(1)), 'am', ...pmTexts].map(escapeRegExp).join('|');

  const isField = (part: Intl.DateTimeFormatPart) => part.type !== 'literal';
  const pattern = pmParts
    .map(({ type, value }, index) => {
      switch (type) {
        case 'hour':
          return '(?<hour>\\d{1,2})';
        case 'minute':
        case 'second':
          return `(?<${type}>\\d{2})`;
        case 'dayPeriod':
          return `(?<dayPeriod>${dayPeriods})`;
        case 'literal': {
          if (!value.trim()) {
            return value;
          }
          // A literal between fields is a separator; one before the first or after the last field is an optional label
          const isSeparator = pmParts.slice(0, index).some(isField) && pmParts.slice(index + 1).some(isField);
          return isSeparator ? `(?::|${escapeRegExp(value)})` : `(?:${escapeRegExp(value)})?`;
        }
        default:
          return '';
      }
    })
    .join('');

  return {
    regex: new RegExp(`^${pattern}$`, 'i'),
    normalize,
    pmTexts: pmTexts.map(text => text.toLowerCase()),
    hourRange: HOUR_RANGES[hourCycle],
  };
}

function parseTime(
  { regex, normalize, pmTexts, hourRange: [minHour, maxHour] }: TimeParser,
  time: string | undefined,
  dateStartAnchor: Date,
  dateEndAnchor: Date,
): TimeStringValidationResult {
  const normalizedTime = normalize(time ?? '').trim();
  if (!normalizedTime) {
    return { date: null, errorType: 'required-input' };
  }

  const fields = regex.exec(normalizedTime)?.groups;
  const hours = Number(fields?.hour);
  const minutes = Number(fields?.minute);
  const seconds = Number(fields?.second ?? 0);
  if (!fields || hours < minHour || hours > maxHour || minutes > 59 || seconds > 59) {
    return { date: null, errorType: 'invalid-input' };
  }

  const { dayPeriod } = fields;
  const hours24 = dayPeriod ? (hours % 12) + (pmTexts.includes(dayPeriod.toLowerCase()) ? 12 : 0) : hours % 24;
  const date = getDateInRange(dateStartAnchor, hours24, minutes, seconds);
  if (!date) {
    return { date: null, errorType: 'invalid-input' };
  }

  return date >= dateEndAnchor ? { date, errorType: 'out-of-bounds' } : { date };
}

/**
 * Returns the first instant on the day of `dateStartAnchor` (or the next day) with the given clock fields that is not
 * before `dateStartAnchor`. A clock time that occurs twice because of a daylight saving transition resolves to the
 * occurrence inside the range; a clock time that does not exist on a day is skipped.
 */
function getDateInRange(dateStartAnchor: Date, hours: number, minutes: number, seconds: number): Date | null {
  for (let dayOffset = 0; dayOffset <= 1; dayOffset++) {
    const candidate = new Date(dateStartAnchor);
    candidate.setDate(candidate.getDate() + dayOffset);
    candidate.setHours(hours, minutes, seconds, 0);

    const shift =
      (new Date(candidate.getTime() + MAX_DST_SHIFT_MS).getTimezoneOffset() - candidate.getTimezoneOffset()) *
      MS_PER_MINUTE;
    const occurrences = shift > 0 ? [candidate, new Date(candidate.getTime() + shift)] : [candidate];
    const inRange = occurrences.find(
      date =>
        date >= dateStartAnchor &&
        date.getHours() === hours &&
        date.getMinutes() === minutes &&
        date.getSeconds() === seconds,
    );
    if (inRange) {
      return inRange;
    }
  }
  return null;
}
