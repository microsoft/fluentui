import { DayOfWeek, DateRangeType, FirstWeekOfYear } from '../dateValues/dateValues';

export interface IDay {
  /** `Date.toString()` value of current date */
  key: string;
  /** `Date.getDate()` value of current date */
  date: string;
  /** `Date` object of current date */
  originalDate: Date;
  /** Is current date is in the same month as "today" date */
  isInMonth: boolean;
  /** Is current date is "today" date */
  isToday: boolean;
  /** Is current date is selected */
  isSelected: boolean;
  /** Is current date within restriction boundaries */
  isInBounds: boolean;
  /** Is current date marked */
  isMarked: boolean;
}

export interface IAvailableDateOptions extends IRestrictedDatesOptions {
  /** Date from which we start the search */
  initialDate: Date;
  /** Ideal available date */
  targetDate: Date;
  /** Direction of search (`1` - search in future / `-1` search in past) */
  direction: number;
}

/**
 * {@docCategory DateTimeUtilities}
 */
export interface IRestrictedDatesOptions {
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
}

/**
 * {@docCategory DateTimeUtilities}
 */
export interface IDayGridOptions extends IRestrictedDatesOptions {
  /**
   * The first day of the week for your locale.
   */
  firstDayOfWeek: DayOfWeek;

  /**
   * Defines when the first week of the year should start, FirstWeekOfYear.FirstDay,
   * FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values
   */
  firstWeekOfYear: FirstWeekOfYear;

  /**
   * The date range type indicating how  many days should be selected as the user
   * selects days
   */
  dateRangeType: DateRangeType;

  /**
   * The number of days to select while dateRangeType === DateRangeType.Day. Used in order to have multi-day
   * views.
   */
  daysToSelectInDayView?: number;

  /**
   * Value of today. If unspecified, current time in client machine will be used.
   */
  today?: Date;

  /**
   * Whether the calendar should show the week number (weeks 1 to 53) before each week row
   */
  showWeekNumbers?: boolean;

  /**
   * The days that are selectable when `dateRangeType` is WorkWeek.
   * If `dateRangeType` is not WorkWeek this property does nothing.
   */
  workWeekDays?: DayOfWeek[];

  /**
   * Which days in the generated grid should be marked.
   */
  markedDays?: Date[];

  /**
   * The currently selected date
   */
  selectedDate: Date;

  /**
   * The currently navigated date
   */
  navigatedDate: Date;

  /**
   * How many weeks to show by default. If not provided, will show enough weeks to display the current
   * month, between 4 and 6 depending
   */
  weeksToShow?: number;
}
