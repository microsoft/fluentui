import { calendarFormatters } from '../Calendar/utils';

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
