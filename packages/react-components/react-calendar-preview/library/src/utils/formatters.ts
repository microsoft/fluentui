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
  fromYear: number;
  toYear: number;
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

const dateTimeFormatters = {
  day: new Intl.DateTimeFormat(undefined, { day: 'numeric' }),
  month: new Intl.DateTimeFormat(undefined, { month: 'long' }),
  shortMonth: new Intl.DateTimeFormat(undefined, { month: 'short' }),
  year: new Intl.DateTimeFormat(undefined, { year: 'numeric' }),
  monthDayYear: new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long', year: 'numeric' }),
  dayMonthYear: new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long', year: 'numeric' }),
  monthYear: new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }),
  weekday: new Intl.DateTimeFormat(undefined, { weekday: 'long' }),
  shortWeekday: new Intl.DateTimeFormat(undefined, { weekday: 'narrow' }),
} as const satisfies Record<CalendarDateTimeFormat, Intl.DateTimeFormat>;

/**
 * Default calendar formatters.
 */
export const calendarFormatters: CalendarFormatters = {
  dateTime: data => dateTimeFormatters[data.format].format(data.date),
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
