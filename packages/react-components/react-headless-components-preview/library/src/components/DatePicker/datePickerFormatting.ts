import { calendarFormatters, createCalendarDateTimeFormatter } from '../Calendar/utils';

const MONTH_NAMES = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

const ISO_DATE = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
const NUMERIC_DATE = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
const MONTH_NAME_DATE = /^([a-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})$/i;

/**
 * Creates a local calendar date from explicit parts, or returns `null` when the parts do not round-trip.
 * February 30 must not normalize into March.
 */
export const createLocalDate = (year: number, monthIndex: number, day: number): Date | null => {
  const date = new Date(year, monthIndex, day);
  // Years 0-99 are otherwise mapped to 1900-1999.
  date.setFullYear(year, monthIndex, day);

  return date.getFullYear() === year && date.getMonth() === monthIndex && date.getDate() === day ? date : null;
};

const getMonthIndex = (name: string): number => {
  const normalizedName = name.toLowerCase();
  // Accept full names and abbreviations of at least three letters, such as "Aug" or "Sept".
  return normalizedName.length < 3 ? -1 : MONTH_NAMES.findIndex(monthName => monthName.startsWith(normalizedName));
};

/**
 * Formats a date as an English long date, such as "August 12, 2026".
 */
export const defaultFormatDate = (date: Date): string => calendarFormatters.dateTime({ date, format: 'monthDayYear' });

/**
 * Parses the English date formats accepted by DatePicker: `YYYY-MM-DD`, a full or abbreviated month name followed by
 * the day and a four-digit year with an optional comma, and `M/D/YYYY`. Date-only ISO values are local calendar dates,
 * not UTC timestamps.
 *
 * @returns The parsed local date, or `null` when the text is not a real calendar date in a supported format.
 */
export const defaultParseDate = (text: string): Date | null => {
  const value = text.trim();

  let match = ISO_DATE.exec(value);
  if (match) {
    return createLocalDate(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  match = NUMERIC_DATE.exec(value);
  if (match) {
    return createLocalDate(Number(match[3]), Number(match[1]) - 1, Number(match[2]));
  }

  match = MONTH_NAME_DATE.exec(value);
  if (match) {
    const monthIndex = getMonthIndex(match[1]);
    return monthIndex < 0 ? null : createLocalDate(Number(match[3]), monthIndex, Number(match[2]));
  }

  return null;
};

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

type DatePickerFormat = {
  dateTime: ReturnType<typeof createCalendarDateTimeFormatter>;
  formatDate: (date: Date) => string;
  parseDate: (text: string) => Date | null;
};

const localeFormats = new Map<string, DatePickerFormat>();

/**
 * Shares a Gregorian locale between Calendar labels, field formatting and strict date parsing.
 */
export const createDatePickerFormat = (locale: string): DatePickerFormat => {
  const cached = localeFormats.get(locale);
  if (cached) {
    return cached;
  }
  const dateTime = createCalendarDateTimeFormatter(locale);
  const numberFormat = new Intl.NumberFormat(locale, { useGrouping: false });
  const digits = Array.from({ length: 10 }, (_, digit) => numberFormat.format(digit));
  const normalize = (text: string) =>
    Array.from(text.replace(/[\u200e\u200f\u061c]/g, ''), char => {
      const digit = digits.indexOf(char);
      return digit < 0 ? char : String(digit);
    }).join('');

  const parsers = (['numeric', 'long', 'short'] as const).map(month => {
    const options: Intl.DateTimeFormatOptions & { calendar: string } = {
      calendar: 'gregory',
      year: 'numeric',
      month,
      day: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat(locale, options);
    const months = Array.from(
      { length: 12 },
      (_, index) => formatter.formatToParts(new Date(2006, index, 23)).find(part => part.type === 'month')!.value,
    );
    const pattern = formatter
      .formatToParts(new Date(2006, 10, 23))
      .map(part => {
        switch (part.type) {
          case 'year':
            return '(?<year>\\d{4})';
          case 'day':
            return '(?<day>\\d{1,2})';
          case 'month':
            return month === 'numeric'
              ? '(?<month>\\d{1,2})'
              : `(?<month>${months.map(name => escapeRegExp(normalize(name))).join('|')})`;
          default:
            return escapeRegExp(normalize(part.value)).replace(/\s+/g, '\\s*');
        }
      })
      .join('');
    return { regex: new RegExp(`^${pattern}$`, 'iu'), months, numeric: month === 'numeric' };
  });

  const localeFormat: DatePickerFormat = {
    dateTime,
    formatDate: (date: Date) => dateTime({ date, format: 'monthDayYear' }),
    parseDate: (text: string): Date | null => {
      const normalized = normalize(text.trim());
      // ISO is unambiguous. Other numeric dates must match the locale's ordering and separators.
      if (ISO_DATE.test(normalized)) {
        return defaultParseDate(normalized);
      }
      for (const { regex, months, numeric } of parsers) {
        const parts = regex.exec(normalized)?.groups;
        if (parts) {
          const monthIndex = numeric
            ? Number(parts.month) - 1
            : months.findIndex(
                name => normalize(name).toLocaleLowerCase(locale) === parts.month.toLocaleLowerCase(locale),
              );
          const date = createLocalDate(Number(parts.year), monthIndex, Number(parts.day));
          if (date) {
            return date;
          }
        }
      }
      return NUMERIC_DATE.test(normalized) ? null : defaultParseDate(normalized);
    },
  };
  localeFormats.set(locale, localeFormat);
  return localeFormat;
};
