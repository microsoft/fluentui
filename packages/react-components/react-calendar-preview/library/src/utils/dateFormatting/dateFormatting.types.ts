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
 * Formats a date using a supported calendar format.
 */
export type FormatDateTime = (date: Date, format: CalendarDateTimeFormat) => string;

/**
 * A date and its formatted display value.
 */
export type CalendarDateLabelData = {
  date: Date;
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
 * Data used to create each calendar accessibility label.
 */
export type CalendarLabelData = {
  previousMonth: CalendarDateLabelData;
  nextMonth: CalendarDateLabelData;
  previousYear: CalendarDateLabelData;
  nextYear: CalendarDateLabelData;
  previousYearRange: CalendarYearRangeLabelData;
  nextYearRange: CalendarYearRangeLabelData;
  monthPickerHeader: CalendarDateLabelData;
  yearPickerHeader: CalendarDateLabelData;
  yearRangePickerHeader: CalendarYearRangeLabelData;
  weekNumber: { weekNumber: number };
  selectedDate: CalendarDateLabelData;
  todayDate: CalendarDateLabelData;
  dayMarked: CalendarDateLabelData;
};

/**
 * Names of supported calendar accessibility labels.
 */
export type CalendarLabel = keyof CalendarLabelData;

/**
 * Arguments accepted by a calendar label formatter.
 */
export type CalendarLabelArgs = {
  [Label in CalendarLabel]: [label: Label, data: CalendarLabelData[Label]];
}[CalendarLabel];

/**
 * Formats a complete localized label. Every label must return meaningful text.
 */
export type FormatCalendarLabel = (...args: CalendarLabelArgs) => string;

/**
 * Formatters for individual calendar accessibility labels.
 */
export type CalendarLabelFormatters = {
  [Label in CalendarLabel]: (data: CalendarLabelData[Label]) => string;
};

/**
 * Label formatters to override while delegating all omitted labels to a fallback formatter.
 */
export type CalendarLabelOverrides = Partial<CalendarLabelFormatters>;

/**
 * Intl options shared by generated calendar date formatters.
 */
export type CalendarIntlDateTimeFormatterOptions = {
  /**
   * Time zone used to format calendar dates.
   */
  timeZone?: string;
};
