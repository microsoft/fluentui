import { CalendarOptions, ValuesOf } from '@microsoft/fast-foundation';

/**
 * CalendarType constants
 * @public
 */
export const CalendarType = {
  date: 'date',
  month: 'month',
  week: 'week',
  year: 'year',
  rangepicker: 'range-picker',
} as const;

/**
 * A Calendar can be of types: date, month, week, year, or range-picker
 * @public
 */
export type CalendarType = ValuesOf<typeof CalendarType>;

/**
 * CalendarFilter constants
 * @public
 */
export const CalendarFilter = {
  week: 'week',
  workweek: 'work-week',
  fourdays: 'four-days',
  threedays: 'three-days',
  twodays: 'two-days',
  oneday: 'one-day',
} as const;

/**
 * A Calendar can have filters of up to a week's length applied to the view
 * @public
 */
export type CalendarFilter = ValuesOf<typeof CalendarFilter>;

/**
 * Enum for days of the week
 * @public
 */
export const DaysOfWeek = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
} as const;

/**
 * Enum type for days of the week where 0 is Sunday and 6 is Saturday
 * @public
 */
export type DaysOfWeek = ValuesOf<typeof DaysOfWeek>;

/**
 * Enum that defines when the first week of the year should start
 * @public
 */
export const FirstWeekOfYear = {
  FirstDay: 0,
  FirstFullWeek: 1,
  FirstFourDayWeek: 2,
} as const;

/**
 * First week of the year can start on the first day, first full week, or first four day week
 * @public
 */
export type FirstWeekOfYear = ValuesOf<typeof FirstWeekOfYear>;

/**
 * Enum that defines when the first week of the year should start
 * @public
 */
export const DateAdjustment = {
  NextDay: 1,
  PreviousDay: -1,
  NextWeek: 7,
  PreviousWeek: -7,
} as const;

/**
 * First week of the year can start on the first day, first full week, or first four day week
 * @public
 */
export type DateAdjustment = ValuesOf<typeof DateAdjustment>;

export { CalendarOptions };
