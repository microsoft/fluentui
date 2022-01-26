import * as React from 'react';
import type { IComboBox, IComboBoxProps } from '../../ComboBox';

/**
 * Range of start and end hours to be shown in the TimePicker.
 */
export interface ITimeRange {
  /** Start hour (inclusive) for the time range, 0-23 */
  start: number;

  /** End hour (exclusive) for the time range, 0-23 */
  end: number;
}

/**
 * Localized strings to use in the TimePicker
 */
export interface ITimePickerStrings {
  /** Error message to render below the field if input parsing fails. */
  invalidInputErrorMessage: string;
}

export interface ITimePickerProps
  extends Omit<
    IComboBoxProps,
    'options' | 'selectedKey' | 'defaultSelectedKey' | 'multiSelect' | 'text' | 'defaultValue' | 'onChange'
  > {
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
   * Default value of the TimePicker, if any
   */
  defaultValue?: Date;

  /**
   * Callback issued when the time is changed
   */
  onChange?: (event: React.FormEvent<IComboBox>, time: Date) => void;

  /**
   * Callback to localize the date strings displayed for dropdown options
   */
  onFormatDate?: (date: Date) => string;

  /**
   * Callback to use custom user-input validation
   */
  onValidateUserInput?: (userInput: string) => string;
}
