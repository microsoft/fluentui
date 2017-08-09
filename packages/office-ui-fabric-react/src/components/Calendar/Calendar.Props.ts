import * as React from 'react';
import { Calendar } from './Calendar';
import { DayOfWeek, DateRangeType } from '../../utilities/dateValues/DateValues';

export { DayOfWeek, DateRangeType };

export interface ICalendar {
  /** Sets focus to the selected date. */
  focus: () => void;
}

export interface ICalendarProps extends React.Props<Calendar> {
  /**
   * Optional callback to access the ICalendar interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: (component: ICalendar) => void;

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
   * @defaultValue DateRangeType.Day
   */
  dateRangeType?: DateRangeType;

  /**
   * Whether the month view should automatically navigate to the next or previous date range
   * depending on the selected date. If this property is set to true and the currently displayed
   * month is March 2017, if the user clicks on a day outside the month, i.e., April 1st, the
   * picker will automatically navigate to the month of April.
   * @defaultValue false
   */
  autoNavigateOnSelection?: boolean;

  /**
   * Whether the "Go to today" link should be shown or not
   */
  showGoToToday?: boolean;

  /**
   * This property has been removed at 0.80.0 in place of the focus method, to be removed @ 1.0.0.
   * @deprecated
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
  * Customize navigation icons using ICalendarIconStrings
  */
  navigationIcons?: ICalendarIconStrings;
}

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
}

export interface ICalendarIconStrings {
  /**
  * FabricMDL2Icons name for the left navigation icon
  * @defaultvalue  'ChevronLeft'
  */
  leftNavigation?: string;

  /**
  * FabricMDL2Icons name for the right navigation icon
  * @defaultvalue  'ChevronRight'
  */
  rightNavigation?: string;

}