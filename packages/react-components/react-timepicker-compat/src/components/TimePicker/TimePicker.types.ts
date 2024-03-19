import * as React from 'react';
import type { ComboboxSlots, ComboboxState, ComboboxProps, SelectionEvents } from '@fluentui/react-combobox';
import type { ComponentProps } from '@fluentui/react-utilities';

export type Hour =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;

/**
 * Data structure for rendering options in the TimePicker.
 */
export type TimePickerOption = {
  /**
   * The Date object associated with the option.
   */
  date: Date;

  /**
   * A unique identifier for the option.
   */
  key: string;

  /**
   * The display text for the option within the Combobox dropdown.
   */
  text: string;
};

/**
 * Error types returned by the `onValidationResult` callback.
 */
export type TimePickerErrorType = 'invalid-input' | 'out-of-bounds' | 'required-input';

export type TimeStringValidationResult = {
  date: Date | null;
  errorType?: TimePickerErrorType;
};

export type TimePickerSlots = ComboboxSlots;

export type TimeSelectionEvents = SelectionEvents | React.FocusEvent<HTMLElement>;
export type TimeSelectionData = {
  /**
   * The Date object associated with the selected option. For freeform TimePicker it can also be the Date object parsed from the user input.
   */
  selectedTime: Date | null;
  /**
   * The display text for the selected option. For freeform TimePicker it can also be the value in user input.
   */
  selectedTimeText: string | undefined;
  /**
   * The error type for the selected option.
   */
  errorType: TimePickerErrorType | undefined;
};

export type TimeFormatOptions = {
  /**
   * A string value indicating whether the 12-hour format ("h11", "h12") or the 24-hour format ("h23", "h24") should be used.
   * - 'h11' and 'h23' start with hour 0 and go up to 11 and 23 respectively.
   * - 'h12' and 'h24' start with hour 1 and go up to 12 and 24 respectively.
   * @default undefined
   */
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24' | undefined;

  /**
   * If true, show seconds in the dropdown options and consider seconds for default validation purposes.
   */
  showSeconds?: boolean;
};

/**
 * TimePicker Props
 */
export type TimePickerProps = Omit<ComponentProps<Partial<ComboboxSlots>, 'input'>, 'children' | 'size'> &
  Pick<
    ComboboxProps,
    | 'appearance'
    | 'clearable'
    | 'defaultOpen'
    | 'defaultValue'
    | 'inlinePopup'
    | 'onOpenChange'
    | 'open'
    | 'placeholder'
    | 'positioning'
    | 'size'
    | 'value'
    | 'mountNode'
    | 'freeform'
  > &
  TimeFormatOptions & {
    /**
     * Start hour (inclusive) for the time range, 0-24.
     */
    startHour?: Hour;

    /**
     * End hour (exclusive) for the time range, 0-24.
     */
    endHour?: Hour;

    /**
     * Time increment, in minutes, of the options in the dropdown.
     */
    increment?: number;

    /**
     * The date in which all dropdown options are based off of.
     */
    dateAnchor?: Date;

    /**
     * Currently selected time in the TimePicker.
     */
    selectedTime?: Date | null;

    /**
     * Default selected time in the TimePicker, for uncontrolled scenarios.
     */
    defaultSelectedTime?: Date;

    /**
     * Callback for when a time selection is made.
     */
    // eslint-disable-next-line @nx/workspace-consistent-callback-type -- can't change type of existing callback
    onTimeChange?: (event: TimeSelectionEvents, data: TimeSelectionData) => void;

    /**
     * Customizes the formatting of date strings displayed in dropdown options.
     */
    formatDateToTimeString?: (date: Date) => string;

    /**
     * In the freeform TimePicker, customizes the parsing from the input time string into a Date and provides custom validation.
     */
    parseTimeStringToDate?: (time: string | undefined) => TimeStringValidationResult;
  };

/**
 * State used in rendering TimePicker
 */
export type TimePickerState = ComboboxState &
  Required<Pick<TimePickerProps, 'freeform' | 'parseTimeStringToDate'>> & {
    /**
     * Submitted text from the input field. It is used to determine if the input value has changed when user submit a new value on Enter or blur from input.
     */
    submittedText: string | undefined;
  };
