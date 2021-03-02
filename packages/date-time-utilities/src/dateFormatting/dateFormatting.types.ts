/**
 * {@docCategory DateTimeUtilities}
 */
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

/**
 * {@docCategory DateTimeUtilities}
 */
export interface IDateFormatting {
  /**
   * Get a localized string for a day.
   */
  formatDay: (date: Date) => string;

  /**
   * Get a localized string for a month.
   */
  formatMonth: (date: Date, strings: IDateGridStrings) => string;

  /**
   * Get a localized string for a year.
   */
  formatYear: (date: Date) => string;

  /**
   * Get a localized string for a month, day, and year.
   */
  formatMonthDayYear: (date: Date, strings: IDateGridStrings) => string;

  /**
   * Get a localized string for a month and year.
   */
  formatMonthYear: (date: Date, strings: IDateGridStrings) => string;
}

/**
 * {@docCategory DateTimeUtilities}
 */
export interface ICalendarStrings extends IDateGridStrings {
  /**
   * String to render for button to direct the user to today's date.
   */
  goToToday: string;

  /**
   * Aria-label for the "previous month" button in day picker.
   */
  prevMonthAriaLabel?: string;

  /**
   * Aria-label for the "next month" button in day picker.
   */
  nextMonthAriaLabel?: string;

  /**
   * Aria-label for the "previous year" button in month picker.
   */
  prevYearAriaLabel?: string;

  /**
   * Aria-label for the "next year" button in month picker.
   */
  nextYearAriaLabel?: string;

  /**
   * Aria-label for the "previous year range" button in year picker.
   */
  prevYearRangeAriaLabel?: string;

  /**
   * Aria-label for the "next year range" button in year picker.
   */
  nextYearRangeAriaLabel?: string;

  /**
   * Aria-label format string for the header button in the month picker. Should have 1 string param, e.g. "`{0}`,
   * select to change the year". This aria-label will only be applied if the year picker is enabled; otherwise
   * the label will default to the header string, e.g. "2019".
   */
  monthPickerHeaderAriaLabel?: string;

  /**
   * Aria-label format string for the header button in the year picker.
   * Should have 1 string param, e.g. "`{0}`, select to change the month"
   */
  yearPickerHeaderAriaLabel?: string;

  /**
   * Aria-label for the "close" button.
   */
  closeButtonAriaLabel?: string;

  /**
   * Aria-label format string for the week number header. Should have 1 string param, e.g. "week number `{0}`"
   */
  weekNumberFormatString?: string;

  /**
   * Aria-label format string for the currently selected date. Should have 1 string param, e.g. "Selected date `{0}`"
   */
  selectedDateFormatString?: string;

  /**
   * Aria-label format string for today's date. Should have 1 string param, e.g. "Today's date `{0}`"
   */
  todayDateFormatString?: string;

  /**
   * Aria-label for when a date is marked
   */
  dayMarkedAriaLabel?: string;
}
