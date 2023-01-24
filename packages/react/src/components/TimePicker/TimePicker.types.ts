import type { IComboBoxProps } from '../../ComboBox';

/**
 * {@docCategory TimePicker}
 * Range of start and end hours to be shown in the TimePicker.
 */
export interface ITimeRange {
  /** Start hour (inclusive) for the time range, 0-23 */
  start: number;

  /** End hour (exclusive) for the time range, 0-23 */
  end: number;
}

/**
 * {@docCategory TimePicker}
 * Localized strings to use in the TimePicker
 */
export interface ITimePickerStrings {
  /** Error message to render below the field if input parsing fails. */
  invalidInputErrorMessage: string;
  /** Default placeholder text to render within ComboBox if no placeholder is provided. */
  defaultTimePickerPlaceholder: string;
}

/**
 * {@docCategory TimePicker}
 */
export interface ITimePickerProps
  extends Omit<IComboBoxProps, 'options' | 'selectedKey' | 'defaultSelectedKey' | 'multiSelect' | 'text' | 'onChange'> {
  /**
   * Label of the component
   */
  label?: string;

  /**
   * Time increments, in minutes, of the options in the dropdown
   */
  increments?: number;

  /**
   * If true, show seconds in the dropdown options and consider seconds for
   * default validation purposes.
   */
  showSeconds?: boolean;

  /**
   * If true, use 12-hour time format. Otherwise, use 24-hour format.
   */
  useHour12?: boolean;

  /**
   * If true, the TimePicker allows freeform user input, rather than restricting
   * to the default increments.
   *
   * The input will still be restricted to valid time values.
   */
  allowFreeform?: boolean;

  /**
   * Custom time range to for time options
   */
  timeRange?: ITimeRange;

  /**
   * Localized strings to use in the TimePicker
   */
  strings?: ITimePickerStrings;

  /**
   * Controlled current date for the TimePicker, if any
   */
  currentDate?: Date;

  /**
   * Callback issued when the time is changed
   */
  onTimeChange?: (time: Date) => void;

  /**
   * Callback to localize the date strings displayed for dropdown options
   */
  onFormatDate?: (date: Date) => string;

  /**
   * Callback to use custom user-input validation
   */
  onValidateUserInput?: (userInput: string) => string;
}
