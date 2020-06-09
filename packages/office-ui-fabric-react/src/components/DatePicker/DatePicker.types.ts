import * as React from 'react';
import { DayOfWeek, ICalendarProps } from '../../Calendar';
import { FirstWeekOfYear } from '../../utilities/dateValues/DateValues';
import { ICalendarFormatDateCallbacks, ICalendarStrings } from '../Calendar/Calendar.types';
import { IStyle, ITheme } from '../../Styling';
import { IRefObject, IBaseProps, IStyleFunctionOrObject, IComponentAs } from '../../Utilities';
import { ICalloutProps } from '../Callout/Callout.types';
import { ITextFieldProps } from '../TextField/TextField.types';

/**
 * {@docCategory DatePicker}
 */
export interface IDatePicker {
  /** Sets focus to the text field */
  focus(): void;

  /** Reset the state of the picker to the default */
  reset(): void;
}

/**
 * {@docCategory DatePicker}
 */
export interface IDatePickerProps extends IBaseProps<IDatePicker>, React.HTMLAttributes<HTMLElement> {
  /**
   * Optional callback to access the IDatePicker interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: IRefObject<IDatePicker>;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<IDatePickerStyleProps, IDatePickerStyles>;

  /**
   * Theme provided by High-Order Component.
   */
  theme?: ITheme;

  /**
   * Pass callout props to callout component
   */
  calloutProps?: ICalloutProps;

  /**
   * Pass calendar props to calendar component
   */
  calendarProps?: ICalendarProps;

  /**
   * Pass textField props to textField component.
   * Prop name is "textField" for compatiblity with upcoming slots work.
   */
  textField?: ITextFieldProps;

  /**
   * Custom Calendar to be used for date picking
   */
  calendarAs?: IComponentAs<ICalendarProps>;

  /**
   * Callback issued when a date is selected
   */
  onSelectDate?: (date: Date | null | undefined) => void;

  /**
   * Label for the DatePicker
   */
  label?: string;

  /**
   * Whether the DatePicker is a required field or not
   * @defaultvalue false
   */
  isRequired?: boolean;

  /**
   * Disabled state of the DatePicker.
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Aria Label for TextField of the DatePicker for screen reader users.
   */
  ariaLabel?: string;

  /**
   * Whether or not the Textfield of the DatePicker is underlined.
   * @defaultvalue false
   */
  underlined?: boolean;

  /**
   * Aria label for date picker popup for screen reader users.
   * @defaultvalue Calendar
   */
  pickerAriaLabel?: string;

  /**
   * Whether the month picker is shown beside the day picker or hidden.
   * @defaultvalue true
   */
  isMonthPickerVisible?: boolean;

  /**
   * Show month picker on top of date picker when visible.
   * @defaultvalue false
   */
  showMonthPickerAsOverlay?: boolean;

  /**
   * Whether the DatePicker allows input a date string directly or not
   * @defaultvalue false
   */
  allowTextInput?: boolean;

  /**
   * Whether the DatePicker should open automatically when the control is focused
   * @defaultvalue false
   */
  disableAutoFocus?: boolean;

  /**
   * Placeholder text for the DatePicker
   */
  placeholder?: string;

  /**
   * Value of today. If null, current time in client machine will be used.
   */
  today?: Date;

  /**
   * Default value of the DatePicker, if any
   */
  value?: Date;

  /**
   * Optional method to format the chosen date to a string to display in the DatePicker
   * @defaultvalue date.toString()
   */
  formatDate?: (date?: Date) => string;

  /**
   * Optional method to parse the text input value to date, it is only useful when allowTextInput is set to true
   * @defaultvalue new Date(Date.parse(dateStr))
   */
  parseDateFromString?: (dateStr: string) => Date | null;

  /**
   * The first day of the week for your locale.
   * @defaultvalue DayOfWeek.Sunday
   */
  firstDayOfWeek?: DayOfWeek;

  /**
   * Localized strings to use in the DatePicker
   */
  strings?: IDatePickerStrings;

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
   * Whether the calendar should show the week number (weeks 1 to 53) before each week row
   * @defaultvalue false
   */
  showWeekNumbers?: boolean;

  /**
   * Defines when the first week of the year should start, FirstWeekOfYear.FirstDay,
   * FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values
   * @defaultvalue FirstWeekOfYear.FirstFullWeek
   */
  firstWeekOfYear?: FirstWeekOfYear;

  /**
   * Whether the "Go to today" link should be shown or not
   */
  showGoToToday?: boolean;

  /**
   * Determines if DatePicker has a border.
   * @defaultvalue false
   */
  borderless?: boolean;

  /**
   * Optional Classname for datepicker root element .
   */
  className?: string;

  /**
   * Apply additional formating to dates, for example localized date formatting.
   */
  dateTimeFormatter?: ICalendarFormatDateCallbacks;

  /**
   * The minimum allowable date.
   */
  minDate?: Date;

  /**
   * The maximum allowable date.
   */
  maxDate?: Date;

  /**
   * The initially highlighted date in the calendar picker
   */
  initialPickerDate?: Date;

  /**
   * Allows all elements to be focused, including disabled ones
   * @defaultvalue false
   */
  allFocusable?: boolean;

  /**
   * Callback that runs after DatePicker's menu (Calendar) is closed
   */
  onAfterMenuDismiss?: () => void;

  /**
   * Whether the CalendarDay close button should be shown or not.
   */
  showCloseButton?: boolean;

  /**
   * The tabIndex of the TextField
   */
  tabIndex?: number;
}

/**
 * {@docCategory DatePicker}
 */
export interface IDatePickerStrings extends ICalendarStrings {
  /**
   * Error message to render for TextField if isRequired validation fails.
   */
  isRequiredErrorMessage?: string;

  /**
   * Error message to render for TextField if input date string parsing fails.
   */
  invalidInputErrorMessage?: string;

  /**
   * Error message to render for TextField if date boundary (minDate, maxDate) validation fails.
   */
  isOutOfBoundsErrorMessage?: string;
}

/**
 * {@docCategory DatePicker}
 */
export interface IDatePickerStyleProps {
  /**
   * Theme provided by High-Order Component.
   */
  theme: ITheme;

  /**
   * Accept custom classNames
   */
  className?: string;

  // Insert DatePicker style props below
  disabled?: boolean;
  label?: boolean;
  isDatePickerShown?: boolean;
}

/**
 * {@docCategory DatePicker}
 */
export interface IDatePickerStyles {
  /**
   * Style for the root element.
   */
  root: IStyle;
  textField: IStyle;
  callout: IStyle;
  icon: IStyle;
}
