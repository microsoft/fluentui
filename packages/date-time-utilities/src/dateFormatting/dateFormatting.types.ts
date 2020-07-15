import { formatDay } from './formatDay';
import { formatYear } from './formatYear';
import { formatMonthDayYear } from './formatMonthDayYear';
import { formatMonthYear } from './formatMonthYear';

export interface IDateGridStrings {
  /**
   * An array of strings for the full names of months.
   * The array is 0-based, so months[0] should be the full name of January.
   */
  months: string[];

  /**
   * An array of strings for the short names of months.
   * The array is 0-based, so shortMonths[0] should be the short name of January.
   */
  shortMonths: string[];

  /**
   * An array of strings for the full names of days of the week.
   * The array is 0-based, so days[0] should be the full name of Sunday.
   */
  days: string[];

  /**
   * An array of strings for the initials of the days of the week.
   * The array is 0-based, so days[0] should be the initial of Sunday.
   */
  shortDays: string[];
}

export interface IDateFormatting extends IDateGridStrings {
  /**
   * Format the day according to specified function.
   * Intended use case is localization.
   */
  formatDay: (date: Date) => string;

  /**
   * Format the year according to specified function.
   * Intended use case is localization.
   */
  formatYear: (date: Date) => string;

  /**
   * Format the month, day and year according to specified function.
   * Intended use case is localization.
   */
  formatMonthDayYear: (date: Date) => string;

  /**
   * Format the month and year according to specified function.
   * Intended use case is localization.
   */
  formatMonthYear: (date: Date) => string;

  /**
   * Parse date from string representation into Date type.
   */
  parse: (date: string) => Date | null;
}

export const DEFAULT_LOCALIZED_STRINGS: IDateGridStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};

export const DEFAULT_DATE_FORMATTING: IDateFormatting = {
  formatDay: formatDay,
  formatYear: formatYear,
  formatMonthDayYear: date => formatMonthDayYear(date, DEFAULT_LOCALIZED_STRINGS),
  formatMonthYear: date => formatMonthYear(date, DEFAULT_LOCALIZED_STRINGS),
  parse: (dateStr: string) => {
    const date = Date.parse(dateStr);
    if (date) {
      return new Date(date);
    }

    return null;
  },
  ...DEFAULT_LOCALIZED_STRINGS,
};
