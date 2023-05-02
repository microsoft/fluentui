/**
 * Format a date object to a localized time string using the browser's default locale
 * @param date - Input date to format
 * @param showSeconds - Whether to show seconds in the formatted string
 * @param useHour12 - Whether to use 12-hour time
 */
export const formatTimeString = (date: Date, showSeconds?: boolean, useHour12?: boolean): string => {
  let localeTimeString = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    second: showSeconds ? '2-digit' : undefined,
    hour12: useHour12,
  });

  if (!useHour12 && localeTimeString.slice(0, 2) === '24') {
    localeTimeString = '00' + localeTimeString.slice(2);
  }

  return localeTimeString;
};
