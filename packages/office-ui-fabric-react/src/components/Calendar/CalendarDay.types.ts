import * as React from 'react';
import { CalendarDayBase } from './CalendarDay.base';
import { DateRangeType, DayOfWeek, FirstWeekOfYear } from '../../utilities/dateValues/DateValues';
import { ICalendarDayStyleProps, ICalendarDayStyles } from './CalendarDay.types';
import { ICalendarFormatDateCallbacks, ICalendarIconStrings, ICalendarStrings } from './Calendar.types';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface ICalendarDay {
  focus: () => void;
}

export interface ICalendarDayProps extends React.Props<CalendarDayBase> {
  autoNavigateOnSelection: boolean;
  className?: string;
  componentRef?: (component: ICalendarDay) => void;
  dateRangeType: DateRangeType;
  dateTimeFormatter: ICalendarFormatDateCallbacks;
  firstDayOfWeek: DayOfWeek;
  firstWeekOfYear: FirstWeekOfYear;
  getStyles?: IStyleFunction<ICalendarDayStyleProps, ICalendarDayStyles>;
  maxDate?: Date;
  minDate?: Date;
  monthPickerVisible?: boolean;
  navigatedDate: Date;
  navigationIcons: ICalendarIconStrings;
  onDismiss?: () => void;
  onHeaderSelect?: (focus: boolean) => void;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
  onSelectDate: (date: Date, selectedDateRangeArray?: Date[]) => void;
  selectedDate: Date;
  showSixWeeksByDefault?: boolean;
  showWeekNumbers?: boolean;
  strings: ICalendarStrings;
  theme?: ITheme;
  today?: Date;
}

export interface ICalendarDayStyleProps {
  /**
   * Theme to apply to the container.
   */
  theme: ITheme;

  /**
   * Custom class name to apply to the container.
   */
  className?: string;

  /**
   * Whether day picker is inline with month picker.
   */
  calendarsInline: boolean;

  /**
   * Whether clicking the header performs the onHeaderSelect action.
   */
  isHeaderSelectable: boolean;

  /**
   * Whether next month navigation is disabled.
   */
  isNextMonthDisabled: boolean;

  /**
   * Whether previous month navigation is disabled.
   */
  isPrevMonthDisabled: boolean;

  /**
  * Whether week numbers are visible.
  */
  showWeekNumbers: boolean;
}

export interface ICalendarDayStyles {
  /**
   * Wrapper containing the calendar view to pick a specific date.
   */
  root: IStyle;

  /**
   * Month previous/next navigation components container.
   */
  navigators: IStyle;

  /**
   * Month previous navigation component.
   */
  prevNavigator: IStyle;

  /**
   * Month next navigation component.
   */
  nextNavigator: IStyle;

  /**
   * The header containing the month and year.
   */
  header: IStyle;

  /**
   * The month and year label. This will be selectable if isHeaderSelectable is set.
   */
  headerLabel: IStyle;

  /**
   * The calendar table of dates.
   */
  table: IStyle;

  /**
   * Additional table style for week numbers.
   */
  weekNumbersTable: IStyle;

  /**
   * The days on the calendar. Base style for day, weekday and week number.
   */
  day: IStyle;

  /**
   * The week number when date(s) in week are selected.
   */
  weekNumberSelected: IStyle;

  /**
   * The day names on the calendar.
   */
  weekday: IStyle;

  /**
   * Highlighted date when week is selected.
   */
  weekBackground: IStyle;

  /**
   * Highlighted date when month is selected.
   */
  monthBackground: IStyle;

  /**
   * Highlighted date when day is selected.
   */
  dayBackground: IStyle;

  /**
   * Disabled day.
   */
  dayDisabled: IStyle;

  /**
   * Focused day (in navigated month and within any defined date boundaries).
   */
  dayFocused: IStyle;

  /**
   * Out of focus days.
   */
  dayUnfocused: IStyle;

  /**
   * Today.
   */
  dayToday: IStyle;

  /**
   * Selected day.
   */
  daySelected: IStyle;

  /**
   * If dateRangeType is Month and topmost selected week has only one day, style for single day.
   */
  daySingleTop: IStyle;

  /**
   * If dateRangeType is Month and topmost selected week has more than one day, style for leftmost day.
   */
  dayCornerTopLeft: IStyle;

  /**
   * If dateRangeType is Month and topmost selected week has more than one day, style for rightmost day.
   */
  dayCornerTopRight: IStyle;

  /**
   * If dateRangeType is Month and bottommost selected week has only one day, style for single day.
   */
  daySingleBottom: IStyle;

  /**
   * If dateRangeType is Month and bottommost selected week has more than one day, style for leftmost day.
   */
  dayCornerBottomLeft: IStyle;

  /**
   * If dateRangeType is Month and bottommost selected week has more than one day, style for rightmost day.
   */
  dayCornerBottomRight: IStyle;
}