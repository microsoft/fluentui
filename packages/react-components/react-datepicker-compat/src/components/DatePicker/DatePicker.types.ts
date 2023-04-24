import * as React from 'react';
import { DayOfWeek, FirstWeekOfYear } from '../../utils';
import { Input } from '@fluentui/react-input';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { CalendarProps } from '../Calendar/Calendar.types';
import type { CalendarStrings, DateFormatting } from '../../utils';
import type { PositioningProps } from '@fluentui/react-positioning';

export type DatePickerSlots = {
  root: NonNullable<Slot<typeof Input>>;
  calendar: NonNullable<Slot<Partial<CalendarProps>>>;
  popupSurface?: Slot<'div'>;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IDatePicker {
  /** Sets focus to the input */
  focus(): void;

  /** Reset the state of the picker to the default */
  reset(): void;

  /** Open the datepicker popup */
  showDatePickerPopup(): void;
}

export type DatePickerProps = Omit<ComponentProps<Partial<DatePickerSlots>>, 'defaultValue' | 'value'> & {
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
   * Whether the DatePicker is a required field or not. When using `<Field>`, this prop is automatically set.
   * @default false
   */
  required?: boolean;

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
   * Whether the DatePicker should be open by default
   *
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Whether the DatePicker is open or not
   *
   * @default false
   */
  open?: boolean;

  /**
   * Callback to run when the DatePicker's open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Callback to run after the DatePicker's input has been validated
   */
  onValidationResult?: (data: DatePickerValidationResultData) => void;

  /**
   * Whether the DatePicker should render the popup as inline or in a portal
   *
   * @default false
   */
  inlinePopup?: boolean;

  /**
   * Configure the positioning of the DatePicker dialog
   *
   * @default below
   */
  positioning?: PositioningProps;

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
   * Localized strings to use in the Calendar
   */
  strings?: CalendarStrings;

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
   * Whether the CalendarDay close button should be shown or not.
   */
  showCloseButton?: boolean;
};

/**
 * State used in rendering DatePicker.
 */
export type DatePickerState = ComponentState<DatePickerSlots> & {
  disabled: boolean;
  inlinePopup: boolean;
};

/**
 * Data passed to the `onValidationResult` callback.
 */
export type DatePickerValidationResultData = {
  /** The error found when validating the input. */
  error?: DatePickerErrorType;
};

/**
 * Error types returned by the `onValidationResult` callback.
 */
export type DatePickerErrorType = 'invalid-input' | 'out-of-bounds' | 'required-input';
