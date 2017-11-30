import * as React from 'react';
import { CalendarMonthBase } from './CalendarMonth.base';
import { ICalendarFormatDateCallbacks, ICalendarIconStrings, ICalendarStrings } from './Calendar.types';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunction } from '../../Utilities';

export interface ICalendarMonth {
  focus: () => void;
}

export interface ICalendarMonthProps extends React.Props<CalendarMonthBase> {
  className?: string;
  componentRef?: (component: ICalendarMonth) => void;
  dateTimeFormatter: ICalendarFormatDateCallbacks;
  dayPickerVisible?: boolean;
  getStyles?: IStyleFunction<ICalendarMonthStyleProps, ICalendarMonthStyles>;
  highlightCurrentMonth: boolean;
  maxDate?: Date;
  minDate?: Date;
  navigatedDate: Date;
  navigationIcons: ICalendarIconStrings;
  onHeaderSelect?: (focus: boolean) => void;
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;
  strings: ICalendarStrings;
  theme?: ITheme;
  today?: Date;
}

export interface ICalendarMonthStyleProps {
  /**
   * Theme to apply to the container.
   */
  theme: ITheme;

  /**
   * Custom class name to apply to the container.
   */
  className?: string;

  /**
   * Whether month picker is inline with day picker.
   */
  calendarsInline: boolean;

  /**
   * Whether the header is selectable.
   */
  isHeaderSelectable: boolean;

  /**
   * Whether previous year navigation is disabled.
   */
  isPrevYearDisabled: boolean;

  /**
   * Whether next year navigation is disabled.
   */
  isNextYearDisabled: boolean;
}

export interface ICalendarMonthStyles {
  /**
   * Wrapper containing the calendar view to pick a specific month.
   */
  root: IStyle;

  /**
   * Year previous/next navigation components.
   */
  navigators: IStyle;

  /**
  * Year previous component.
  */
  prevNavigator: IStyle;

  /**
   * Year next component.
   */
  nextNavigator: IStyle;

  /**
   * The header containing the year.
   */
  header: IStyle;

  /**
   * Text showing the currently selected year.
   */
  headerLabel: IStyle;

  /**
   * The grid of months.
   */
  monthsGrid: IStyle;

  /**
   * Single month grid cell.
   */
  month: IStyle;

  /**
   * Current month.
   */
  monthCurrent: IStyle;

  /**
   * Selected month.
   */
  monthSelected: IStyle;

  /**
   * Disabled month.
   */
  monthDisabled: IStyle;
}