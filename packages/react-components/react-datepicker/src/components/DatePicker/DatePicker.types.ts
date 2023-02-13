import * as React from 'react';
import { Input } from '@fluentui/react-input';
import { Field } from '@fluentui/react-field';
import { DayOfWeek, FirstWeekOfYear } from '../../utils';
import { PopoverSurface } from '@fluentui/react-popover';
import type { InputProps } from '@fluentui/react-input';
import type { PopoverProps } from '@fluentui/react-popover';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { CalendarProps } from '../Calendar/Calendar.types';
import type { CalendarStrings, DateFormatting } from '../../utils';

export type DatePickerSlots = {
  root: NonNullable<Slot<'div'>>;
  inputField: NonNullable<Slot<typeof Field>>;
  input: NonNullable<Slot<typeof Input>>;
  wrapper: NonNullable<Slot<'div'>>;
  popover: NonNullable<Slot<Partial<PopoverProps>>>;
  popoverSurface: NonNullable<Slot<typeof PopoverSurface>>;
  calendar: NonNullable<Slot<Partial<CalendarProps>>>;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IDatePicker {
  /** Sets focus to the text field */
  focus(): void;

  /** Reset the state of the picker to the default */
  reset(): void;

  /** Open the datepicker callout */
  showDatePickerPopup(): void;
}

export type DatePickerProps = ComponentProps<Partial<DatePickerSlots>> & {
  /**
   * Optional callback to access the IDatePicker interface. Use this instead of ref for accessing
   * the public methods and properties of the component.
   */
  componentRef?: React.RefObject<IDatePicker>;

  /**
   * Pass textField props to textField component.
   * Prop name is "textField" for compatibility with upcoming slots work.
   */
  textField?: InputProps;

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
   * WARNING: setting this to false creates an accessibility violation and is not recommended
   * @defaultvalue true
   */
  disableAutoFocus?: boolean;

  /**
   * Whether the DatePicker should open when the input is clicked
   * @defaultvalue true
   */
  openOnClick?: boolean;

  /**
   * Placeholder text for the DatePicker
   */
  placeholder?: string;

  /**
   * Value of today. If unspecified, current time in client machine will be used.
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
  strings?: DatePickerStrings;

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
   * Determines if the DatePicker has a border.
   * @defaultvalue false
   */
  borderless?: boolean;

  /**
   * Optional CSS class for the DatePicker root element.
   */
  className?: string;

  /**
   * Apply additional formatting to dates, for example localized date formatting.
   */
  dateTimeFormatter?: DateFormatting;

  /**
   * The minimum allowable date.
   */
  minDate?: Date;

  /**
   * The maximum allowable date.
   */
  maxDate?: Date;

  /**
   * The initially highlighted date.
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
};

export type DatePickerState = ComponentState<DatePickerSlots> & {
  disabled: boolean;
  isDatePickerShown: boolean;
};

/**
 * {@docCategory DatePicker}
 */
export interface DatePickerStrings extends CalendarStrings {
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

  /**
   * Status message to render for TextField the input date parsing fails,
   * and the typed value is cleared and reset to the previous value.
   *  e.g. "Invalid entry `{0}`, date reset to `{1}`"
   */
  isResetStatusMessage?: string;
}
