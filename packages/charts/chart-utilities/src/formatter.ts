/**
 * This function checks if the number is very close to an integer (within a small epsilon value).
 * If it is, it rounds the number to the nearest integer; otherwise, it returns the original number.
 * This is useful to avoid issues with floating point precision errors in calculations.
 * Refer 'https://docs.python.org/release/2.5.1/tut/node16.html' for more details.
 * @param num - The number to check for floating point precision error.
 * @returns The number after resolving floating point precision errors.
 */
export function handleFloatingPointPrecisionError(num: number): number {
  const rounded = Math.round(num);
  return Math.abs(num - rounded) < 1e-6 ? rounded : num;
}

/**
 * LocaleStringDataProps defines the type of data that can be formatted to a locale string.
 */
type LocaleStringDataProps = number | string | Date | undefined;

/**
 * Formats a number, string, or date to a locale-specific string representation.
 * If the input is a number or a numeric string, it will be formatted with appropriate grouping.
 * If the input is a Date object, it will be formatted to a locale string based on the culture and UTC preference.
 * If the input is undefined, null, an empty string, or NaN, it will return the input as is.
 *
 * @param data - The data to format (number, string, Date, or undefined).
 * @param culture - Optional culture code for formatting (e.g., 'en-US').
 * @param useUtc - Optional flag to indicate if the date should be formatted in UTC.
 * @returns The formatted string or the original data if no formatting is applied.
 */
export const formatToLocaleString = (
  data: LocaleStringDataProps,
  culture?: string,
  useUtc?: boolean | string,
): LocaleStringDataProps => {
  if (data === undefined || data === null || data === '' || Number.isNaN(data)) {
    return data;
  }
  culture = culture || undefined;
  if (typeof data === 'number') {
    const toGroup = Math.abs(data) >= 10000;
    return handleFloatingPointPrecisionError(data).toLocaleString(culture, { useGrouping: toGroup });
  } else if (typeof data === 'string' && !window.isNaN(Number(data))) {
    const num = Number(data);
    const toGroup = Math.abs(num) >= 10000;
    return handleFloatingPointPrecisionError(num).toLocaleString(culture, { useGrouping: toGroup });
  } else if (data instanceof Date) {
    return formatDateToLocaleString(data, culture, useUtc ? true : false);
  }

  return data;
};

const DEFAULT_DATE_TIME_FORMAT_OPTION: Intl.DateTimeFormatOptions = {
  // Locale date and time
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
};

/**
 * Formats a Date object to a locale-specific string representation.
 * If the date is invalid, it returns an empty string.
 * If the culture is not provided, it defaults to the browser's locale.
 * If useUtc is true, it formats the date in UTC.
 * If showTZname is true, it includes the time zone name in the formatted string.
 *
 * @param date - The Date object to format.
 * @param culture - Optional culture code for formatting (e.g., 'en-US').
 * @param useUtc - Optional flag to indicate if the date should be formatted in UTC.
 * @param showTZname - Optional flag to include time zone name in the formatted string.
 * @param options - Optional Intl.DateTimeFormatOptions for additional formatting options.
 * @returns The formatted date string or an empty string if the date is invalid.
 */
export const formatDateToLocaleString = (
  date: Date,
  culture?: string,
  useUtc?: boolean,
  showTZname: boolean = true,
  options?: Intl.DateTimeFormatOptions,
): string => {
  culture = culture || undefined;
  options = options || DEFAULT_DATE_TIME_FORMAT_OPTION;
  if (useUtc) {
    options = { ...options, timeZone: 'UTC' };
  }
  if (showTZname) {
    options = { ...options, timeZoneName: 'short' };
  }

  return date.toLocaleString(culture, options);
};

/**
 * This function returns a multilevel formatter for a given date range.
 * It determines the appropriate date format to accommodate each tick value.
 * The goal is to represent the date label in the smallest possible format without loss of information.
 * There is an exhaustive map of all possible date/time units and their respective formats.
 * Based on the range of formatting granularity levels, a date time format spanning the range is returned.
 * Refer https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
 * to see explanation about each format specifier
 * @param startLevel - The starting level of the date format.
 * @param endLevel - The ending level of the date format.
 * @param useUTC - Optional flag to indicate if the date should be formatted in UTC.
 * @returns - An Intl.DateTimeFormatOptions object that can be used to format date/time values.
 */
export function getMultiLevelDateTimeFormatOptions(startLevel?: number, endLevel?: number): Intl.DateTimeFormatOptions {
  const DEFAULT = DEFAULT_DATE_TIME_FORMAT_OPTION;
  const MS: Intl.DateTimeFormatOptions = {
    // Milliseconds only (Intl does not support ms directly)
    second: '2-digit',
  };

  const MS_S: Intl.DateTimeFormatOptions = MS;
  const MS_S_MIN: Intl.DateTimeFormatOptions = {
    // Minutes, seconds, milliseconds
    minute: '2-digit',
    second: '2-digit',
  };

  const MS_S_MIN_H: Intl.DateTimeFormatOptions = {
    // Hour (12), minute, second, ms, AM/PM
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };

  const MS_S_MIN_H_D: Intl.DateTimeFormatOptions = {
    // Abbreviated weekday, day, time
    weekday: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const MS_S_MIN_H_D_W: Intl.DateTimeFormatOptions = {
    // Abbreviated month, day, time
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const MS_S_MIN_H_D_W_M: Intl.DateTimeFormatOptions = MS_S_MIN_H_D_W;
  const MS_S_MIN_H_D_W_M_Y: Intl.DateTimeFormatOptions = DEFAULT;
  const S: Intl.DateTimeFormatOptions = MS_S;
  const S_MIN: Intl.DateTimeFormatOptions = MS_S_MIN;
  const S_MIN_H: Intl.DateTimeFormatOptions = MS_S_MIN_H;
  const S_MIN_H_D: Intl.DateTimeFormatOptions = MS_S_MIN_H_D;
  const S_MIN_H_D_W: Intl.DateTimeFormatOptions = MS_S_MIN_H_D_W;
  const S_MIN_H_D_W_M: Intl.DateTimeFormatOptions = MS_S_MIN_H_D_W_M;
  const S_MIN_H_D_W_M_Y: Intl.DateTimeFormatOptions = DEFAULT;

  const MIN: Intl.DateTimeFormatOptions = {
    // Hour (12), minute, AM/PM
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const MIN_H: Intl.DateTimeFormatOptions = MIN;
  const MIN_H_D: Intl.DateTimeFormatOptions = {
    // Abbreviated weekday, day, hour (12), minute, AM/PM
    weekday: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const MIN_H_D_W: Intl.DateTimeFormatOptions = {
    // Abbreviated month, day, hour (12), minute, AM/PM
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const MIN_H_D_W_M: Intl.DateTimeFormatOptions = MIN_H_D_W;
  const MIN_H_D_W_M_Y: Intl.DateTimeFormatOptions = {
    // Locale date, hour (12), minute, AM/PM
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const H: Intl.DateTimeFormatOptions = {
    // Hour (12), AM/PM
    hour: '2-digit',
    hour12: true,
  };

  const H_D: Intl.DateTimeFormatOptions = {
    // Abbreviated weekday, day, hour (12), AM/PM
    weekday: 'short',
    day: '2-digit',
    hour: '2-digit',
    hour12: true,
  };

  const H_D_W: Intl.DateTimeFormatOptions = {
    // Abbreviated month, day, hour (12), AM/PM
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    hour12: true,
  };

  const H_D_W_M: Intl.DateTimeFormatOptions = H_D_W;
  const H_D_W_M_Y: Intl.DateTimeFormatOptions = {
    // Locale date, hour (12), AM/PM
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    hour12: true,
  };

  const D: Intl.DateTimeFormatOptions = {
    // Abbreviated weekday, day
    weekday: 'short',
    day: '2-digit',
  };

  const D_W: Intl.DateTimeFormatOptions = {
    // Abbreviated month, day
    month: 'short',
    day: '2-digit',
  };

  const D_W_M: Intl.DateTimeFormatOptions = D_W;
  const D_W_M_Y: Intl.DateTimeFormatOptions = {
    // Locale date
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const W: Intl.DateTimeFormatOptions = D_W;
  const W_M: Intl.DateTimeFormatOptions = W;
  const W_M_Y: Intl.DateTimeFormatOptions = D_W_M_Y;
  const M: Intl.DateTimeFormatOptions = {
    // Full month name
    month: 'long',
  };

  const M_Y: Intl.DateTimeFormatOptions = {
    // Abbreviated month, year
    month: 'short',
    year: 'numeric',
  };

  const Y: Intl.DateTimeFormatOptions = {
    // Year
    year: 'numeric',
  };

  const MULTI_LEVEL_DATE_TIME_FORMATS = [
    // ms, s, min, h, d, w, m, y
    [MS, MS_S, MS_S_MIN, MS_S_MIN_H, MS_S_MIN_H_D, MS_S_MIN_H_D_W, MS_S_MIN_H_D_W_M, MS_S_MIN_H_D_W_M_Y], // ms
    [DEFAULT, S, S_MIN, S_MIN_H, S_MIN_H_D, S_MIN_H_D_W, S_MIN_H_D_W_M, S_MIN_H_D_W_M_Y], // s
    [DEFAULT, DEFAULT, MIN, MIN_H, MIN_H_D, MIN_H_D_W, MIN_H_D_W_M, MIN_H_D_W_M_Y], // min
    [DEFAULT, DEFAULT, DEFAULT, H, H_D, H_D_W, H_D_W_M, H_D_W_M_Y], // h
    [DEFAULT, DEFAULT, DEFAULT, DEFAULT, D, D_W, D_W_M, D_W_M_Y], // d
    [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, W, W_M, W_M_Y], // w
    [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, M, M_Y], // m
    [DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, Y], // y
  ];

  if (startLevel === undefined || startLevel < 0 || startLevel >= MULTI_LEVEL_DATE_TIME_FORMATS.length) {
    return DEFAULT;
  }

  if (endLevel === undefined || endLevel < startLevel) {
    return MULTI_LEVEL_DATE_TIME_FORMATS[startLevel][startLevel];
  }

  if (endLevel >= MULTI_LEVEL_DATE_TIME_FORMATS[startLevel].length) {
    return MULTI_LEVEL_DATE_TIME_FORMATS[startLevel][MULTI_LEVEL_DATE_TIME_FORMATS[startLevel].length - 1];
  }

  return MULTI_LEVEL_DATE_TIME_FORMATS[startLevel][endLevel];
}
