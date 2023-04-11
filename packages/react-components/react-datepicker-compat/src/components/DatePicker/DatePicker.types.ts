import * as React from 'react';
import { Input } from '@fluentui/react-input';
import { Field } from '@fluentui/react-field';
import { DayOfWeek, FirstWeekOfYear } from '../../utils';
import { PopoverSurface } from '@fluentui/react-popover';
import type { PopoverProps } from '@fluentui/react-popover';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { CalendarProps } from '../Calendar/Calendar.types';
import type { CalendarStrings, DateFormatting } from '../../utils';

export type DatePickerSlots = {
  root: NonNullable<Slot<'div'>>;
  field: NonNullable<Slot<typeof Field>>;
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
   * Callback issued when a date is selected
   */
  onSelectDate?: (date: Date | null | undefined) => void;

  /**
   * Label for the DatePicker
   */
  label?: string;

  /**
   * Whether the DatePicker is a required field or not
   * @default false
   */
  isRequired?: boolean;

  /**
   * Disabled state of the DatePicker.
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether or not the Input of the DatePicker is underlined.
   * @default false
   */
  underlined?: boolean;

  /**
   * Whether the month picker is shown beside the day picker or hidden.
   * @default true
   */
  isMonthPickerVisible?: boolean;

  /**
   * Show month picker on top of date picker when visible.
   * @default false
   */
  showMonthPickerAsOverlay?: boolean;

  /**
   * Whether the DatePicker allows input a date string directly or not
   * @default false
   */
  allowTextInput?: boolean;

  /**
   * Whether the DatePicker should open automatically when the control is focused
   * WARNING: setting this to false creates an accessibility violation and is not recommended
   * @default true
   */
  disableAutoFocus?: boolean;

  /**
   * Whether the DatePicker should open when the input is clicked
   * @default true
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
   * @default date.toString()
   */
  formatDate?: (date?: Date) => string;

  /**
   * Optional method to parse the text input value to date, it is only useful when allowTextInput is set to true
   * @default new Date(Date.parse(dateStr))
   */
  parseDateFromString?: (dateStr: string) => Date | null;

  /**
   * The first day of the week for your locale.
   * @default DayOfWeek.Sunday
   */
  firstDayOfWeek?: DayOfWeek;

  /**
   * Localized strings to use in the DatePicker
   */
  strings?: DatePickerStrings;

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
   * Whether the calendar should show the week number (weeks 1 to 53) before each week row
   * @default false
   */
  showWeekNumbers?: boolean;

  /**
   * Defines when the first week of the year should start, FirstWeekOfYear.FirstDay,
   * FirstWeekOfYear.FirstFullWeek or FirstWeekOfYear.FirstFourDayWeek are the possible values
   * @default FirstWeekOfYear.FirstFullWeek
   */
  firstWeekOfYear?: FirstWeekOfYear;

  /**
   * Whether the "Go to today" link should be shown or not
   */
  showGoToToday?: boolean;

  /**
   * Determines if the DatePicker has a border.
   * @default false
   */
  borderless?: boolean;

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
   * @default false
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
   * The tabIndex of the Input
   */
  tabIndex?: number;
};

export type DatePickerState = ComponentState<DatePickerSlots> & {
  disabled: boolean;
  isDatePickerShown: boolean;
};

export interface DatePickerStrings extends CalendarStrings {
  /**
   * Error message to render for Input if isRequired validation fails.
   */
  isRequiredErrorMessage?: string;

  /**
   * Error message to render for Input if input date string parsing fails.
   */
  invalidInputErrorMessage?: string;

  /**
   * Error message to render for Input if date boundary (minDate, maxDate) validation fails.
   */
  isOutOfBoundsErrorMessage?: string;

  /**
   * Status message to render for Input the input date parsing fails,
   * and the typed value is cleared and reset to the previous value.
   *  e.g. "Invalid entry `{0}`, date reset to `{1}`"
   */
  isResetStatusMessage?: string;
}
