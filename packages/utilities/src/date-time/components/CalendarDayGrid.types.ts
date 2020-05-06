import { DayOfWeek, DateRangeType } from '../dateValues/DateValues';
import { ICalendarStrings } from './Calendar.types';

export interface ICalendarDayGridStateAndProps extends ICalendarDayGridCommonProps, ICalendarDayGridCommonState {}

export interface IDayInfo {
  key: string;
  date: string;
  originalDate: Date;
  isInMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInBounds: boolean;
  onSelected: () => void;
}

export interface ICalendarDayGridCommonState {
  /**
   * Weeks is a 2D array. Weeks[0] contains the last week of the prior range,
   * Weeks[weeks.length - 1] contains first week of next range. These are for transition states.
   *
   * Weeks[1... weeks.length - 2] contains the actual visible data
   */
  weeks?: IDayInfo[][];
}

export interface ICalendarDayGridCommonProps {
  /**
   * The currently selected date
   */
  selectedDate: Date;

  /**
   * The currently navigated date
   */
  navigatedDate: Date;

  /**
   * The first day of the week for your locale.
   * @defaultvalue DayOfWeek.Sunday
   */
  firstDayOfWeek: DayOfWeek;

  /**
   * The date range type indicating how  many days should be selected as the user
   * selects days
   * @defaultValue DateRangeType.Day
   */
  dateRangeType: DateRangeType;

  /**
   * The number of days to select while dateRangeType === DateRangeType.Day. Used in order to have multi-day
   * views.
   * @defaultValue 1
   */
  daysToSelectInDayView?: number;

  /**
   * Value of today. If null, current time in client machine will be used.
   */
  today?: Date;

  /**
   * How many weeks to show by default. If not provided, will show enough weeks to display the current
   * month, between 4 and 6 depending
   * @defaultvalue undefined
   */
  weeksToShow?: number;

  /**
   * If set the Calendar will not allow navigation to or selection of a date earlier than this value.
   */
  minDate?: Date;

  /**
   * If set the Calendar will not allow navigation to or selection of a date later than this value.
   */
  maxDate?: Date;

  /**
   * If set the Calendar will not allow selection of dates in this array.
   */
  restrictedDates?: Date[];

  /**
   * The days that are selectable when `dateRangeType` is WorkWeek.
   * If `dateRangeType` is not WorkWeek this property does nothing.
   * @defaultvalue [Monday,Tuesday,Wednesday,Thursday,Friday]
   */
  workWeekDays?: DayOfWeek[];

  /**
   * Localized strings to use in the Calendar
   */
  strings: ICalendarStrings;
}
