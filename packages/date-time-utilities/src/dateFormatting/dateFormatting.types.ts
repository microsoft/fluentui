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
  formatMonthDayYear: (date: Date, strings: IDateGridStrings) => string;

  /**
   * Format the month and year according to specified function.
   * Intended use case is localization.
   */
  formatMonthYear: (date: Date, strings: IDateGridStrings) => string;

  /**
   * Parse date from string representation into Date type.
   */
  parseDate: (date: string) => Date | null;
}

export interface ICalendarStrings extends IDateFormatting {
  /**
   * Error message to render for TextField if isRequired validation fails.
   */
  isRequiredErrorMessage?: string;

  /**
   * Error message to render for TextField if input date string parsing fails.
   */
  invalidInputErrorMessage?: string;

  /**
   * Error message to render for TextField if date boundary (minDate, maxDate) validation fails.
   */
  isOutOfBoundsErrorMessage?: string;

  /**
   * String to render for button to direct the user to today's date.
   */
  goToToday: string;

  /**
   * Title for button to open the calendar.
   */
  openCalendarTitle: string;

  /**
   * Placeholder string for an unfilled input.
   */
  inputPlaceholder: string;

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
   * Aria-label format string for calendar cell. Should have 2 string params, 0 is date and 1 is dayOfWeek"
   */
  calendarCellFormatString?: string;

  /**
   * Aria-label for input."
   */
  inputAriaLabel?: string;

  /**
   * Aria-label format string for restricted input. Should have 2 string params, 0 is minDate and 1 is maxDate"
   */
  inputBoundedFormatString?: string;

  /**
   * Aria-label format string for restricted input only with minDate. Should have 1 string param, 0 is minDate"
   */
  inputMinBoundedFormatString?: string;

  /**
   * Aria-label format string for restricted input only with maxDate. Should have 1 string param, 0 is maxDate"
   */
  inputMaxBoundedFormatString?: string;
}
