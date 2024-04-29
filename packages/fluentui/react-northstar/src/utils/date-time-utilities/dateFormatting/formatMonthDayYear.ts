import { IDateGridStrings } from './dateFormatting.types';

/**
 * Format date to a month-day-year string
 * @param date - input date to format
 * @param strings - localized strings
 */
export const formatMonthDayYear = (date: Date, strings: IDateGridStrings) =>
  `${strings.months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
