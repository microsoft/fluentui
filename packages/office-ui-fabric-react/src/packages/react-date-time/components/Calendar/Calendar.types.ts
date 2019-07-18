import * as React from 'react';
import { DayOfWeek, FirstWeekOfYear, DateRangeType } from '../../utilities/dateValues/DateValues';
import { IRefObject, IBaseProps } from '../../Utilities';
export { DayOfWeek, DateRangeType, FirstWeekOfYear };

/**
 * {@docCategory Calendar}
 */
export interface ICalendar {
  /** Sets focus to the selected date. */
  focus: () => void;
}

/**
 * {@docCategory Calendar}
 */
export interface ICalendarProps extends IBaseProps<ICalendar>, React.HTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the ICalendar interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ICalendar>;

  /**
   * Optional class name to add to the root element.
   */
  className?: string;

  /**
   * Callback issued when a date is selected
   * @param date - The date the user selected
   * @param selectedDateRangeArray - The resultant list of dates that are selected based on the date range type set for the component.
   */
  onSelectDate?: (date: Date, selectedDateRangeArray?: Date[]) => void;

  /**
   * Callback issued when calendar is closed
   */
  onDismiss?: () => void;

  /**
   * Whether the month picker is shown beside the day picker or hidden.
   * @defaultvalue true
   */
  isMonthPickerVisible?: boolean;

  /**
   * Whether the day picker is shown beside the month picker or hidden.
   * @defaultvalue true
   */
  isDayPickerVisible?: boolean;

  /**
   * Show month picker on top of date picker when visible.
   * @defaultvalue false
   */
  showMonthPickerAsOverlay?: boolean;

  /**
   * Value of today. If null, current time in client machine will be used.
   */
  today?: Date;

  /**
   * Default value of the Calendar, if any
   */
  value?: Date;

  /**
   * The first day of the week for your locale.
   * @defaultvalue DayOfWeek.Sunday
   */
  firstDayOfWeek?: DayOfWeek;

  /**
   * The date range type indicating how  many days should be selected as the user
   * selects days
   * @defaultvalue DateRangeType.Day
   */
  dateRangeType?: DateRangeType;

  /**
   * Whether the month view should automatically navigate to the next or previous date range
   * depending on the selected date. If this property is set to true and the currently displayed
   * month is March 2017, if the user clicks on a day outside the month, i.e., April 1st, the
   * picker will automatically navigate to the month of April.
   * @defaultvalue false
   */
  autoNavigateOnSelection?: boolean;

  /**
   * Whether the "Go to today" link should be shown or not
   */
  showGoToToday?: boolean;

  /**
   * This property has been removed at 0.80.0 in place of the `focus` method, to be removed \@ 1.0.0.
   * @deprecated Replaced with the `focus` method.
   */
  shouldFocusOnMount?: boolean;

  /**
   * Localized strings to use in the Calendar
   */
  strings: ICalendarStrings | null;

  /**
   * Whether the month picker should highlight the current month
   * @defaultvalue false
   */
  highlightCurrentMonth?: boolean;

  /**
   * Whether the month picker should highlight the selected month
   * @defaultvalue false
   */
  highlightSelectedMonth?: boolean;

  /**
   * Customize navigation icons using ICalendarIconStrings
   */
  navigationIcons?: ICalendarIconStrings;

  /**
   * Whether the calendar should show the week number (weeks 1 to 53) before each week row
   * @defaultvalue false
   */
  showWeekNumbers?: boolean;

  /**
   * Defines when the first week of the year should start, FirstWeekOfYear.FirstDay,
   * FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values
   * @defaultvalue FirstWeekOfYear.FirstDay
   */
  firstWeekOfYear?: FirstWeekOfYear;

  /**
   * Apply additional formating to dates, for example localized date formatting.
   */
  dateTimeFormatter?: ICalendarFormatDateCallbacks;

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
   * Whether the calendar should show 6 weeks by default.
   * @defaultvalue false
   */
  showSixWeeksByDefault?: boolean;

  /**
   * The days that are selectable when dateRangeType is WorkWeek. If dateRangeType is not WorkWeek this property does nothing.
   * @defaultvalue [Monday,Tuesday,Wednesday,Thursday,Friday]
   */
  workWeekDays?: DayOfWeek[];

  /**
   * When clicking on "Today", select the date and close the calendar.
   * @defaultvalue false
   */
  selectDateOnClick?: boolean;

  /**
   * Whether the close button should be shown or not
   * @defaultvalue false
   */
  showCloseButton?: boolean;

  /**
   * Allows all dates and buttons to be focused, including disabled ones
   * @defaultvalue false
   */
  allFocusable?: boolean;

  /**
   * Whether the year picker is enabled
   * @defaultvalue false
   */
  yearPickerHidden?: boolean;
}

/**
 * {@docCategory Calendar}
 */
export interface ICalendarStrings {
  /**
   * An array of strings for the full names of months.
   * The array is 0-based, so months[0] should be the full name of January.
   */
  months: string[];

  /**
   * An array of strings for the short names of months.
   * The array is 0-based, so shortMonths[0] should be the short name of January.
   */
  shortMonths: string[];

  /**
   * An array of strings for the full names of days of the week.
   * The array is 0-based, so days[0] should be the full name of Sunday.
   */
  days: string[];

  /**
   * An array of strings for the initials of the days of the week.
   * The array is 0-based, so days[0] should be the initial of Sunday.
   */
  shortDays: string[];

  /**
   * String to render for button to direct the user to today's date.
   */
  goToToday: string;

  /**
   * Aria-label for the "previous month" button.
   */
  prevMonthAriaLabel?: string;

  /**
   * Aria-label for the "next month" button.
   */
  nextMonthAriaLabel?: string;

  /**
   * Aria-label for the "previous year" button.
   */
  prevYearAriaLabel?: string;

  /**
   * Aria-label for the "next year" button.
   */
  nextYearAriaLabel?: string;

  /**
   * Aria-label for the "previous year range" button.
   */
  prevYearRangeAriaLabel?: string;

  /**
   * Aria-label for the "next year range" button.
   */
  nextYearRangeAriaLabel?: string;

  /**
   * Aria-label for the "close" button.
   */
  closeButtonAriaLabel?: string;

  /**
   * Aria-label format string for the week number header. Should have 1 string param e.g. "week number \{0\}"
   */
  weekNumberFormatString?: string;
}

/**
 * {@docCategory Calendar}
 */
export interface ICalendarIconStrings {
  /**
   * FabricMDL2Icons name for the left navigation icon.  Previous default: ChevronLeft.
   * @defaultvalue 'Up'
   */
  leftNavigation?: string;

  /**
   * FabricMDL2Icons name for the right navigation icon.  Previous default: ChevronRight.
   * @defaultvalue 'Down'
   */
  rightNavigation?: string;

  /**
   * Close icon
   * @defaultvalue 'CalculatorMultiply'
   */
  closeIcon?: string;
}

/**
 * {@docCategory Calendar}
 */
export interface ICalendarFormatDateCallbacks {
  /**
   * Callback to apply formatting to mmmm d, yyyy formated dates
   */
  formatMonthDayYear: (date: Date, strings?: ICalendarStrings) => string;

  /**
   * Callback to apply formatting to the month and year in the Day Picker header
   */
  formatMonthYear: (date: Date, strings?: ICalendarStrings) => string;

  /**
   * Callback to apply formatting to the days in the Day Picker calendar
   */
  formatDay: (date: Date) => string;

  /**
   * Callback to apply formatting to the year in the Month Picker header
   */
  formatYear: (date: Date) => string;
}
