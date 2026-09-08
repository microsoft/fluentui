/**
 * Supported date and time display formats.
 */
export type CalendarDateTimeFormat =
  | 'day'
  | 'month'
  | 'shortMonth'
  | 'year'
  | 'monthDayYear'
  | 'dayMonthYear'
  | 'monthYear'
  | 'weekday'
  | 'shortWeekday';

/**
 * A date and its formatted display value.
 */
export type CalendarDateLabelData = {
  /**
   * The actual date object.
   */
  date: Date;
  /**
   * The formatted display value of the date.
   */
  formattedDate: string;
};

/**
 * A year range and its formatted display value.
 */
export type CalendarYearRangeLabelData = {
  /**
   * The starting year of the range.
   */
  fromYear: number;
  /**
   * The ending year of the range.
   */
  toYear: number;
  /**
   * The formatted display value of the year range.
   */
  formattedRange: string;
};

/**
 * Formatters used for calendar display values and accessibility labels.
 */
export type CalendarFormatters = {
  /**
   * Formats a date according to the specified format.
   */
  dateTime: (data: { date: Date; format: CalendarDateTimeFormat }) => string;

  /**
   * Formats the label for the previous month button.
   */
  previousMonthLabel: (data: CalendarDateLabelData) => string;

  /**
   * Formats the label for the next month button.
   */
  nextMonthLabel: (data: CalendarDateLabelData) => string;

  /**
   * Formats the label for the previous year button.
   */
  previousYearLabel: (data: CalendarDateLabelData) => string;
  /**
   * Formats the label for the next year button.
   */
  nextYearLabel: (data: CalendarDateLabelData) => string;
  /**
   * Formats the label for the previous year range button.
   */
  previousYearRangeLabel: (data: CalendarYearRangeLabelData) => string;
  /**
   * Formats the label for the next year range button.
   */
  nextYearRangeLabel: (data: CalendarYearRangeLabelData) => string;
  /**
   * Formats the label for the month picker header.
   */
  monthPickerHeaderLabel: (data: CalendarDateLabelData) => string;
  /**
   * Formats the label for the year picker header.
   */
  yearPickerHeaderLabel: (data: CalendarDateLabelData) => string;
  /**
   * Formats the label for the year range picker header.
   */
  yearRangePickerHeaderLabel: (data: CalendarYearRangeLabelData) => string;
  /**
   * Formats the label for the week number column header.
   */
  weekNumberLabel: (data: { weekNumber: number }) => string;

  /**
   * Formats the label for the selected date.
   */
  selectedDateLabel: (data: CalendarDateLabelData) => string;
  /**
   * Formats the label for today's date.
   */
  todayDateLabel: (data: CalendarDateLabelData) => string;

  /**
   * Formats the label for a marked day.
   */
  dayMarkedLabel: (data: CalendarDateLabelData) => string;
};

/**
 * Intl options applied consistently to every date display format.
 * These affect labels only, not the calendar's Gregorian date arithmetic.
 */
export type CalendarDateTimeFormatterOptions = Pick<Intl.DateTimeFormatOptions, 'timeZone'>;

const dateTimeFormatters = {
  day: { day: 'numeric' },
  month: { month: 'long' },
  shortMonth: { month: 'short' },
  year: { year: 'numeric' },
  monthDayYear: { day: 'numeric', month: 'long', year: 'numeric' },
  dayMonthYear: { day: 'numeric', month: 'long', year: 'numeric' },
  monthYear: { month: 'long', year: 'numeric' },
  weekday: { weekday: 'long' },
  shortWeekday: { weekday: 'narrow' },
} satisfies Record<CalendarDateTimeFormat, Intl.DateTimeFormatOptions>;

/**
 * Creates reusable Intl formatters for every calendar date format. Full dates follow locale-specific
 * field ordering, so `monthDayYear` and `dayMonthYear` produce the same locale-appropriate label.
 */
export function createCalendarDateTimeFormatter(
  locales?: string | string[],
  options?: CalendarDateTimeFormatterOptions,
): CalendarFormatters['dateTime'] {
  const formatters = Object.fromEntries(
    Object.entries(dateTimeFormatters).map(([key, fields]) => [
      key,
      new Intl.DateTimeFormat(locales, { ...options, ...fields }),
    ]),
  );

  return data => formatters[data.format].format(data.date);
}

/**
 * Default calendar formatters.
 */
export const calendarFormatters: CalendarFormatters = {
  dateTime: createCalendarDateTimeFormatter(),
  previousMonthLabel: data => `Previous month ${data.formattedDate}`,
  nextMonthLabel: data => `Next month ${data.formattedDate}`,
  previousYearLabel: data => `Previous year ${data.formattedDate}`,
  nextYearLabel: data => `Next year ${data.formattedDate}`,
  previousYearRangeLabel: data => `Previous year range ${data.formattedRange}`,
  nextYearRangeLabel: data => `Next year range ${data.formattedRange}`,
  monthPickerHeaderLabel: data => `${data.formattedDate}, change year`,
  yearPickerHeaderLabel: data => `${data.formattedDate}, change month`,
  yearRangePickerHeaderLabel: data => `${data.formattedRange}, change year`,
  weekNumberLabel: data => `Week number ${data.weekNumber}`,
  selectedDateLabel: data => `Selected date ${data.formattedDate}`,
  todayDateLabel: data => `Today's date ${data.formattedDate}`,
  dayMarkedLabel: data => `${data.formattedDate}, marked`,
};
