import * as React from 'react';
import type { CalendarStrings, DateFormatting } from '../../utils';
import type { CalendarNavigationIcons } from '../Calendar/Calendar.types';
import type { CalendarDayGridProps, CalendarDayGridStyleProps } from '../CalendarDayGrid/CalendarDayGrid.types';

/**
 * {@docCategory Calendar}
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface ICalendarDay {
  focus(): void;
}

/**
 * {@docCategory Calendar}
 */
export interface CalendarDayProps extends CalendarDayGridProps {
  /**
   * Optional callback to access the ICalendarDay interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.RefObject<ICalendarDay>;

  /**
   * Additional CSS class(es) to apply to the CalendarDay.
   */
  className?: string;

  /**
   * Localized strings to use in the Calendar
   */
  strings: CalendarStrings;

  /**
   * The currently navigated date
   */
  navigatedDate: Date;

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
   * Custom navigation icons.
   */
  navigationIcons: CalendarNavigationIcons;

  /**
   * Callback function when the header is selected
   */
  onHeaderSelect?: () => void;

  /**
   * Whether the calendar should show the week number (weeks 1 to 53) before each week row
   * @defaultvalue false
   */
  showWeekNumbers?: boolean;

  /**
   * Apply additional formatting to dates, for example localized date formatting.
   */
  dateTimeFormatter: DateFormatting;

  /**
   * Whether the calendar should show 6 weeks by default.
   * @defaultvalue false
   */
  showSixWeeksByDefault?: boolean;

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
export interface CalendarDayStyleProps extends CalendarDayGridStyleProps {
  /**
   * Accept custom classNames
   */
  className?: string;

  // Insert CalendarDay style props below

  /**
   * Whether the header is clickable
   */
  headerIsClickable?: boolean;

  /**
   * Whether week numbers are being shown
   */
  showWeekNumbers?: boolean;
}

/**
 * {@docCategory Calendar}
 */
export interface CalendarDayStyles {
  /**
   * Style for the root element.
   */
  root: string;

  /**
   * The style for the header button and forward/back navigation button container
   */
  header: string;

  /**
   * The style for the title text inside the header
   */
  monthAndYear: string;

  /**
   * The style for the wrapper around forward/back/close buttons
   */
  monthComponents: string;

  /**
   * The style for the forward/back/close buttons
   */
  headerIconButton: string;

  /**
   * The style to apply for disabled elements
   */
  disabledStyle: string;
}
