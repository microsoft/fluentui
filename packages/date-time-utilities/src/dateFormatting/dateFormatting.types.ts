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
  parseDate: (date: string) => Date | null;
}
