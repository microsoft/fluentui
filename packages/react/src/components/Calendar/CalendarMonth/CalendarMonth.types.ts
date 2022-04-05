import { AnimationDirection } from '../Calendar.types';
import type { IBaseProps, IRefObject, IStyleFunctionOrObject } from '@fluentui/utilities';
import type { ICalendarNavigationIcons } from '../Calendar.types';
import type { ITheme } from '@fluentui/style-utilities';
import type { ICalendarPickerStyleProps, ICalendarPickerStyles } from '../CalendarPicker/CalendarPicker.types';
import type { ICalendarStrings, IDateFormatting } from '@fluentui/date-time-utilities';

/**
 * {@docCategory Calendar}
 */
export interface ICalendarMonth {
  focus(): void;
}

/**
 * {@docCategory Calendar}
 */
export interface ICalendarMonthProps extends IBaseProps<ICalendarMonth> {
  /**
   * Optional callback to access the ICalendarMonth interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<ICalendarMonth>;

  /**
   * Customized styles for the calendar month component
   */
  styles?: IStyleFunctionOrObject<ICalendarMonthStyleProps, ICalendarMonthStyles>;

  /**
   * Theme (provided through customization).
   */
  theme?: ITheme;

  /**
   * Localized strings to use in the Calendar
   */
  strings: ICalendarStrings;

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
   * Custom navigation icons.
   */
  navigationIcons?: ICalendarNavigationIcons;

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
  dateTimeFormatter?: IDateFormatting;

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
   * @defaultvalue false
   */
  highlightCurrentMonth?: boolean;

  /**
   * Whether the month picker should highlight the selected month
   * @defaultvalue false
   */
  highlightSelectedMonth?: boolean;

  /**
   * Allows all dates and buttons to be focused, including disabled ones
   * @defaultvalue false
   */
  allFocusable?: boolean;

  /**
   * Additional CSS class(es) to apply to the CalendarMonth.
   */
  className?: string;

  /**
   * Whether the year picker is hidden
   * @defaultvalue false
   */
  yearPickerHidden?: boolean;

  /**
   * The cardinal directions for animation to occur during transitions, either horizontal or veritcal
   */
  animationDirection?: AnimationDirection;
}

/**
 * {@docCategory Calendar}
 */
export interface ICalendarMonthStyleProps extends ICalendarPickerStyleProps {}

/**
 * {@docCategory Calendar}
 */
export interface ICalendarMonthStyles extends ICalendarPickerStyles {}
