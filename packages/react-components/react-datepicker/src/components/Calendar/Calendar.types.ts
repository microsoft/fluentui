import * as React from 'react';
import type { Slot } from '@fluentui/react-utilities';
import type { IStyle, ITheme } from '@fluentui/style-utilities';
import type { IBaseProps, IStyleFunctionOrObject } from '@fluentui/utilities';
import type { CalendarStrings, DateFormatting, DateRangeType, DayOfWeek, FirstWeekOfYear } from '../../utils';
import type { CalendarDayProps } from '../CalendarDay/CalendarDay.types';
import type { CalendarMonthProps } from '../CalendarMonth/CalendarMonth.types';

export type CalendarSlots = {
  root: Slot<'div'>;
};

/**
 * {@docCategory Calendar}
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ICalendar {
  /** Sets focus to the selected date. */
  focus: () => void;
}

/**
 * {@docCategory Calendar}
 */
export interface CalendarProps extends IBaseProps<ICalendar>, React.RefAttributes<HTMLDivElement> {
  /**
   * Optional callback to access the ICalendar interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.RefObject<ICalendar>;

  /**
   * Customized styles for the calendar component
   */
  styles?: IStyleFunctionOrObject<CalendarStyleProps, CalendarStyles>;

  /**
   * Customized props for the calendar day
   */
  calendarDayProps?: Partial<CalendarDayProps>;

  /**
   * Customized props for the calendar month
   */
  calendarMonthProps?: Partial<CalendarMonthProps>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Optional class name to add to the root element.
   */
  className?: string;

  /**
   * Callback for when a date is selected
   * @param date - The date the user selected
   * @param selectedDateRangeArray - The resultant list of dates that are selected based on the date range type set
   * for the component.
   */
  onSelectDate?: (date: Date, selectedDateRangeArray?: Date[]) => void;

  /**
   * Callback for when calendar is closed
   */
  onDismiss?: () => void;

  /**
   * ID for the calendar
   */
  id?: string;

  /**
   * Default value of the Calendar, if any
   */
  value?: Date;

  /**
   * Value of today. If unspecified, current time in client machine will be used.
   */
  today?: Date;

  /**
   * The date range type indicating how  many days should be selected as the user
   * selects days
   * @defaultValue DateRangeType.Day
   */
  dateRangeType?: DateRangeType;

  /**
   * The first day of the week for your locale.
   * @defaultvalue DayOfWeek.Sunday
   */
  firstDayOfWeek?: DayOfWeek;

  /**
   * Defines when the first week of the year should start.
   * @defaultvalue FirstWeekOfYear.FirstDay
   */
  firstWeekOfYear?: FirstWeekOfYear;

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
   * Whether the "Go to today" link should be shown or not
   */
  showGoToToday?: boolean;

  /**
   * Whether the calendar should show the week number (weeks 1 to 53) before each week row
   * @defaultvalue false
   */
  showWeekNumbers?: boolean;

  /**
   * Localized strings to use in the Calendar
   */
  strings?: CalendarStrings;

  /**
   * Custom navigation icons.
   */
  navigationIcons?: CalendarNavigationIcons;

  /**
   * Apply additional formatting to dates, for example localized date formatting.
   */
  dateTimeFormatter?: DateFormatting;

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
   * The days that are selectable when `dateRangeType` is `WorkWeek`.
   * If `dateRangeType` is not `WorkWeek` this property does nothing.
   * @defaultvalue [Monday,Tuesday,Wednesday,Thursday,Friday]
   */
  workWeekDays?: DayOfWeek[];

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
   * Whether the close button should be shown or not
   * @defaultvalue false
   */
  showCloseButton?: boolean;

  /**
   * Allows all dates and buttons to be focused, including disabled ones
   * @defaultvalue false
   */
  allFocusable?: boolean;
}

/**
 * {@docCategory Calendar}
 */
export interface CalendarNavigationIcons {
  /**
   * FabricMDL2Icons name for the left navigation icon.  Previous default: ChevronLeft.
   * @defaultvalue  'Up'
   */
  leftNavigation?: string;

  /**
   * FabricMDL2Icons name for the right navigation icon.  Previous default: ChevronRight.
   * @defaultvalue  'Down'
   */
  rightNavigation?: string;

  /**
   * Close icon
   * @defaultvalue  'CalculatorMultiply'
   */
  closeIcon?: string;
}

/**
 * {@docCategory Calendar}
 */
export interface CalendarStyleProps {
  /**
   * Custom CSS class for the calendar.
   */
  className?: string;

  /**
   * Whether the month picker is visible
   */
  isMonthPickerVisible?: boolean;

  /**
   * Whether the day picker is visible
   */
  isDayPickerVisible?: boolean;

  /**
   * Whether only month picker is shown
   */
  monthPickerOnly?: boolean;

  /**
   * Whether the month picker is overlaid on the day picker
   */
  showMonthPickerAsOverlay?: boolean;

  /**
   * @deprecated Use `overlaidWithButton`
   */
  overlayedWithButton?: boolean;

  /**
   * Whether the month and day picker are overlaid and the 'go to today' button is shown
   */
  overlaidWithButton?: boolean;

  /**
   * Whether the go to today button is shown
   */
  showGoToToday?: boolean;

  /**
   * Whether the week numbers are shown
   */
  showWeekNumbers?: boolean;
}

/**
 * {@docCategory Calendar}
 */
export interface CalendarStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;

  divider: IStyle;

  goTodayButton: IStyle;

  monthPickerWrapper: IStyle;

  liveRegion: IStyle;
}

/**
 * {@docCategory Calendar}
 */
export enum AnimationDirection {
  /**
   * Grid will transition out and in horizontally
   */
  Horizontal,

  /**
   * Grid will transition out and in vertically
   */
  Vertical,
}
