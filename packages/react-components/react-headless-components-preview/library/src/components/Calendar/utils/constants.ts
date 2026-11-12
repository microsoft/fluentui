/**
 * The days of the week.
 */
export type DayOfWeek = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

/**
 * The days of the week, ordered so that each index matches `Date.prototype.getDay()`.
 */
export const daysOfWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const satisfies readonly DayOfWeek[];

/**
 * Default working days used by work-week ranges.
 */
export const DEFAULT_WORK_WEEK_DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
] as const satisfies readonly DayOfWeek[];

/**
 * Determines which week counts as the first week of the year.
 * - `firstDay` - the week containing January 1st.
 * - `firstFullWeek` - the first week entirely within the new year.
 * - `firstFourDayWeek` - the first week with at least four days in the new year.
 */
export type FirstWeekOfYear = 'firstDay' | 'firstFullWeek' | 'firstFourDayWeek';

/**
 * The supported date range types, describing how many days are selected when the user picks a date.
 */
export type DateRangeType = 'day' | 'week' | 'month' | 'workWeek';

/**
 * Number of days in a week.
 */
export const DAYS_IN_WEEK = 7;
