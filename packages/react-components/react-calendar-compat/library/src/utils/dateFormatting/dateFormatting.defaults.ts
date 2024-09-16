import type { CalendarStrings, DateFormatting, DateGridStrings } from './dateFormatting.types';

/**
 * Format date to a day string representation
 * @param date - input date to format
 */
export const formatDay = (date: Date) => date.getDate().toString();

/**
 * Format date to a month-day-year string
 * @param date - input date to format
 * @param strings - localized strings
 */
export const formatMonthDayYear = (date: Date, strings: DateGridStrings) =>
  strings.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

/**
 * Format date to a month-year string
 * @param date - input date to format
 * @param strings - localized strings
 */
export const formatMonthYear = (date: Date, strings: DateGridStrings) =>
  strings.months[date.getMonth()] + ' ' + date.getFullYear();

/**
 * Format date to a month string
 * @param date - input date to format
 * @param strings - localized strings
 */
export const formatMonth = (date: Date, strings: DateGridStrings) => strings.months[date.getMonth()];

/**
 * Format date to a year string representation
 * @param date - input date to format
 */
export const formatYear = (date: Date) => date.getFullYear().toString();

export const DEFAULT_DATE_GRID_STRINGS: DateGridStrings = {
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

export const DEFAULT_DATE_FORMATTING: DateFormatting = {
  formatDay,
  formatMonth,
  formatYear,
  formatMonthDayYear,
  formatMonthYear,
};

export const DEFAULT_CALENDAR_STRINGS: CalendarStrings = {
  ...DEFAULT_DATE_GRID_STRINGS,

  goToToday: 'Go to today',
  weekNumberFormatString: 'Week number {0}',
  prevMonthAriaLabel: 'Previous month',
  nextMonthAriaLabel: 'Next month',
  prevYearAriaLabel: 'Previous year',
  nextYearAriaLabel: 'Next year',
  prevYearRangeAriaLabel: 'Previous year range',
  nextYearRangeAriaLabel: 'Next year range',
  closeButtonAriaLabel: 'Close',
  selectedDateFormatString: 'Selected date {0}',
  todayDateFormatString: "Today's date {0}",
  monthPickerHeaderAriaLabel: '{0}, change year',
  yearPickerHeaderAriaLabel: '{0}, change month',
  dayMarkedAriaLabel: 'marked',
};
