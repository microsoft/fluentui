import * as React from 'react';
import { AnimationDirection } from '../Calendar/Calendar.types';
import type { CalendarNavigationIcons } from '../Calendar/calendarNavigationIcons';
import type { CalendarStrings, DateFormatting } from '../../utils';
import type { CalendarPickerStyleProps, CalendarPickerStyles } from '../CalendarPicker/CalendarPicker.types';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ICalendarMonth {
  focus(): void;
}

export interface CalendarMonthProps {
  /**
   * Optional callback to access the ICalendarMonth interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.RefObject<ICalendarMonth>;

  /**
   * Localized strings to use in the Calendar
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
   * Callback issued when a month is selected
   * @param date - The date the user selected
   * @param selectedDateRangeArray - The resultant list of dates that are selected based on the date range type set
   * for the component.
   */
  onSelectDate?: (date: Date, selectedDateRangeArray?: Date[]) => void;

  /**
   * Callback issued when the year is navigated
   * @param date - The date that is navigated to
   * @param focusOnNavigatedDay - Whether to set the focus to the navigated date.
   */
  onNavigateDate: (date: Date, focusOnNavigatedDay: boolean) => void;

  /**
   * Value of today. If unspecified, current time in client machine will be used.
   */
  today?: Date;

  /**
   * Callback function when the header is selected
   */
  onHeaderSelect?: () => void;

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
   * Whether the month picker should highlight the current month
   * @default false
   */
  highlightCurrentMonth?: boolean;

  /**
   * Whether the month picker should highlight the selected month
   * @default false
   */
  highlightSelectedMonth?: boolean;

  /**
   * Allows all dates and buttons to be focused, including disabled ones
   * @default false
   */
  allFocusable?: boolean;

  /**
   * Additional CSS class(es) to apply to the CalendarMonth.
   */
  className?: string;

  /**
   * Whether the year picker is hidden
   * @default false
   */
  yearPickerHidden?: boolean;

  /**
   * The cardinal directions for animation to occur during transitions, either horizontal or veritcal
   */
  animationDirection?: AnimationDirection;

  /**
   * Custom navigation icons.
   */
  navigationIcons: CalendarNavigationIcons;
}

/**
 * @internal
 */
export interface CalendarMonthStyleProps extends CalendarPickerStyleProps {}

/**
 * @internal
 */
export interface CalendarMonthStyles extends CalendarPickerStyles {}
