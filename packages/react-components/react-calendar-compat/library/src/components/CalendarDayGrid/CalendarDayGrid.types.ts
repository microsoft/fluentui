import * as React from 'react';
import { AnimationDirection } from '../Calendar/Calendar.types';
import { DayOfWeek, FirstWeekOfYear, DateRangeType } from '../../utils';
import type { CalendarStrings, DateFormatting, DayGridOptions } from '../../utils';

/**
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ICalendarDayGrid {
  focus(): void;
}

/**
 * @internal
 */
export interface CalendarDayGridProps extends DayGridOptions {
  /**
   * Optional callback to access the ICalendarDayGrid interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.RefObject<ICalendarDayGrid>;

  /**
   * Additional CSS class(es) to apply to the CalendarDayGrid.
   */
  className?: string;

  /**
   * Localized strings to use in the CalendarDayGrid
   */
  strings: CalendarStrings;

  /**
   * The currently selected date
   */
  selectedDate: Date;

  /**
   * The currently navigated date
   */
  navigatedDate: Date;

  /**
   * Callback issued when a date is selected
   * @param date - The date the user selected
   * @param selectedDateRangeArray - The resultant list of dates that are selected based on the date range type set
   * for the component.
   */
  onSelectDate?: (date: Date, selectedDateRangeArray?: Date[]) => void;

  /**
   * Callback issued when a date in the calendar is navigated
   * @param date - The date that is navigated to
   * @param focusOnNavigatedDay - Whether to set the focus to the navigated date.
   */
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;

  /**
   * Callback issued when calendar day is closed
   */
  onDismiss?: () => void;

  /**
   * The first day of the week for your locale.
   * @default DayOfWeek.Sunday
   */
  firstDayOfWeek: DayOfWeek;

  /**
   * Defines when the first week of the year should start, FirstWeekOfYear.FirstDay,
   * FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values
   * @default FirstWeekOfYear.FirstDay
   */
  firstWeekOfYear: FirstWeekOfYear;

  /**
   * The date range type indicating how  many days should be selected as the user
   * selects days
   * @default DateRangeType.Day
   */
  dateRangeType: DateRangeType;

  /**
   * The number of days to select while dateRangeType === DateRangeType.Day. Used in order to have multi-day
   * views.
   * @default 1
   */
  daysToSelectInDayView?: number;

  /**
   * Value of today. If unspecified, current time in client machine will be used.
   */
  today?: Date;

  /**
   * Whether the calendar should show the week number (weeks 1 to 53) before each week row
   * @default false
   */
  showWeekNumbers?: boolean;

  /**
   * Apply additional formatting to dates, for example localized date formatting.
   */
  dateTimeFormatter: DateFormatting;

  /**
   * Ref callback for individual days. Allows for customization of the styling, properties, or listeners of the
   * specific day.
   */
  customDayCellRef?: (element: HTMLElement, date: Date, classNames: CalendarDayGridStyles) => void;

  /**
   * How many weeks to show by default. If not provided, will show enough weeks to display the current
   * month, between 4 and 6 depending
   * @default undefined
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
   * @default [Monday,Tuesday,Wednesday,Thursday,Friday]
   */
  workWeekDays?: DayOfWeek[];

  /**
   * Whether the close button should be shown or not
   * @default false
   */
  showCloseButton?: boolean;

  /**
   * Allows all dates and buttons to be focused, including disabled ones
   * @default false
   */
  allFocusable?: boolean;

  /**
   * The ID of the control that labels this one
   */
  labelledBy?: string;

  /**
   * Whether to show days outside the selected month with lighter styles
   * @default true
   */
  lightenDaysOutsideNavigatedMonth?: boolean;

  /**
   * The cardinal directions for animation to occur during transitions, either horizontal or veritcal
   */
  animationDirection?: AnimationDirection;

  /**
   * Optional callback function to mark specific days with a small symbol. Fires when the date range changes,
   * gives the starting and ending displayed dates and expects the list of which days in between should be
   * marked.
   */
  getMarkedDays?: (startingDate: Date, endingDate: Date) => Date[];
}

/**
 * @internal
 */
export interface CalendarDayGridStyleProps {
  /**
   * Accept custom classNames
   */
  className?: string;

  /**
   * The date range type
   */
  dateRangeType?: DateRangeType;

  /**
   * Whether week numbers are being shown
   */
  showWeekNumbers?: boolean;

  /**
   * Whether to show days outside the selected month with lighter styles
   */
  lightenDaysOutsideNavigatedMonth?: boolean;

  /**
   * Whether grid entering animation should be forwards or backwards
   */
  animateBackwards?: boolean;

  /**
   * The cardinal directions for animation to occur during transitions, either horizontal or vertical
   */
  animationDirection?: AnimationDirection;
}

/**
 * @internal
 */
export interface CalendarDayGridStyles {
  /**
   * The style for the root div
   */
  wrapper?: string;

  /**
   * The style for the table containing the grid
   */
  table?: string;

  /**
   * The style to apply to the grid cells for days
   */
  dayCell?: string;

  /**
   * The style to apply to grid cells for days in the selected range
   */
  daySelected?: string;

  /**
   * The classname applied when a single day is selected
   */
  daySingleSelected?: string;

  /**
   * The style to apply to row around weeks
   */
  weekRow?: string;

  /**
   * The style to apply to the column headers above the weeks
   */
  weekDayLabelCell?: string;

  /**
   * The style to apply to grid cells for week numbers
   */
  weekNumberCell?: string;

  /**
   * The style to apply to individual days that are outside the min/max date range
   */
  dayOutsideBounds?: string;

  /**
   * The style to apply to individual days that are outside the current month
   */
  dayOutsideNavigatedMonth?: string;

  /**
   * The style to apply to the button element within the day cells
   */
  dayButton?: string;

  /**
   * The style to apply to the individual button element that matches the "today" parameter
   */
  dayIsToday?: string;

  /**
   * The style applied to the first placeholder week used during transitions
   */
  firstTransitionWeek?: string;

  /**
   * The style applied to the last placeholder week used during transitions
   */
  lastTransitionWeek?: string;

  /**
   * The style applied to the marker on days to mark as important
   */
  dayMarker?: string;

  /**
   * The classname applied to the day "today" span
   */
  dayTodayMarker?: string;
}
