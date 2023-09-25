import * as React from 'react';
import type { IComboBox, IComboBoxProps } from '../../ComboBox';

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
  /** Error message to render if the user input date is out of bounds. */
  timeOutOfBoundsErrorMessage?: string;
}

/**
 * {@docCategory TimePicker}
 * A type used to represent the TimePicker validation result.
 */
export type TimePickerValidationResultData = {
  errorMessage?: string;
};

/**
 * {@docCategory TimePicker}
 */
export interface ITimePickerProps
  extends Omit<
    IComboBoxProps,
    'options' | 'selectedKey' | 'defaultSelectedKey' | 'multiSelect' | 'text' | 'defaultValue' | 'onChange'
  > {
  /**
   * Label of the component.
   */
  label?: string;

  /**
   * Time increments, in minutes, of the options in the dropdown.
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
   * Custom time range to for time options.
   */
  timeRange?: ITimeRange;

  /**
   * Localized strings to use in the TimePicker.
   */
  strings?: ITimePickerStrings;

  /**
   * The uncontrolled default selected time.
   * Mutually exclusive with `value`.
   */
  defaultValue?: Date;

  /**
   * A Date representing the selected time. If you provide this, you must maintain selection
   * state by observing onChange events and passing a new value in when changed.
   * Mutually exclusive with `defaultValue`.
   */
  value?: Date;

  /**
   * The date in which all dropdown options are based off of.
   */
  dateAnchor?: Date;

  /**
   * A callback for receiving a notification when the time has been changed.
   */
  onChange?: (event: React.FormEvent<IComboBox>, time: Date) => void;

  /**
   * Callback to localize the date strings displayed for dropdown options.
   */
  onFormatDate?: (date: Date) => string;

  /**
   * Callback to use custom user-input validation.
   */
  onValidateUserInput?: (userInput: string) => string;

  /**
   * Callback to get validation result.
   */
  onValidationResult?: (event: React.FormEvent<IComboBox>, data: TimePickerValidationResultData) => void;
}
