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

export { CalendarOptions };
