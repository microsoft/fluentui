import type {
  CalendarDateTimeFormat,
  CalendarIntlDateTimeFormatterOptions,
  CalendarLabelOverrides,
  FormatCalendarLabel,
  FormatDateTime,
} from './dateFormatting.types';

const dateTimeFormats: Record<CalendarDateTimeFormat, Intl.DateTimeFormatOptions> = {
  day: { day: 'numeric' },
  month: { month: 'long' },
  shortMonth: { month: 'short' },
  year: { year: 'numeric' },
  monthDayYear: { day: 'numeric', month: 'long', year: 'numeric' },
  dayMonthYear: { day: 'numeric', month: 'long', year: 'numeric' },
  monthYear: { month: 'long', year: 'numeric' },
  weekday: { weekday: 'long' },
  shortWeekday: { weekday: 'narrow' },
};

/**
 * Creates a localized formatter for supported calendar date formats.
 */
export const createCalendarDateTimeFormatter = (
  locales?: string | string[],
  options: CalendarIntlDateTimeFormatterOptions = {},
): FormatDateTime => {
  const formatters = Object.fromEntries(
    Object.entries(dateTimeFormats).map(([format, formatOptions]) => [
      format,
      new Intl.DateTimeFormat(locales, { ...options, ...formatOptions }),
    ]),
  );

  return (date, format) => formatters[format].format(date);
};

/**
 * Formats calendar dates in English (United States).
 */
export const formatDateTime = createCalendarDateTimeFormatter('en-US');

/**
 * Creates the default accessibility label for a calendar element.
 */
export const formatLabel: FormatCalendarLabel = (label, data) => {
  switch (label) {
    case 'previousMonth':
      return `Previous month ${data.formattedDate}`;
    case 'nextMonth':
      return `Next month ${data.formattedDate}`;
    case 'previousYear':
      return `Previous year ${data.formattedDate}`;
    case 'nextYear':
      return `Next year ${data.formattedDate}`;
    case 'previousYearRange':
      return `Previous year range ${data.formattedRange}`;
    case 'nextYearRange':
      return `Next year range ${data.formattedRange}`;
    case 'monthPickerHeader':
      return `${data.formattedDate}, change year`;
    case 'yearPickerHeader':
      return `${data.formattedDate}, change month`;
    case 'yearRangePickerHeader':
      return `${data.formattedRange}, change year`;
    case 'weekNumber':
      return `Week number ${data.weekNumber}`;
    case 'selectedDate':
      return `Selected date ${data.formattedDate}`;
    case 'todayDate':
      return `Today's date ${data.formattedDate}`;
    case 'dayMarked':
      return `${data.formattedDate}, marked`;
  }
};

/**
 * Creates a label formatter that applies overrides before the fallback formatter.
 */
export const createCalendarLabelFormatter =
  (overrides: CalendarLabelOverrides, fallback: FormatCalendarLabel = formatLabel): FormatCalendarLabel =>
  (...args) => {
    const [label, data] = args;
    const override = overrides[label];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return override ? override(data as any) : fallback(...args);
  };
