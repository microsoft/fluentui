import type * as React from 'react';
import type {
  ComboboxContextValues,
  ComboboxProps,
  ComboboxSlots,
  ComboboxState,
  SelectionEvents,
} from '@fluentui/react-combobox';
import type { ComponentProps, DistributiveOmit, EventData, EventHandler } from '@fluentui/react-utilities';
import type { Hour, TimeFormatOptions, TimePickerErrorType, TimeStringValidationResult } from '../../utils/types';

export type TimePickerSlots = ComboboxSlots;

/**
 * Events that can trigger a time selection.
 */
export type TimePickerSelectedTimeChangeEvent = SelectionEvents | React.FocusEvent<HTMLElement>;

/**
 * Data passed to the `onSelectedTimeChange` callback.
 */
export type TimePickerSelectedTimeChangeData = EventData<
  'change' | 'click' | 'keydown' | 'blur',
  TimePickerSelectedTimeChangeEvent
> & {
  /**
   * The Date object associated with the selected option. For freeform TimePicker it can also be the Date object parsed from the user input.
   */
  selectedTime: Date | null;

  /**
   * The display text for the selected option. For freeform TimePicker it can also be the value in user input.
   */
  selectedTimeText: string | undefined;

  /**
   * The error type for the selected time, if any.
   */
  errorType: TimePickerErrorType | undefined;
};

/**
 * TimePicker specific props, shared by the styled and headless TimePicker.
 */
export type TimePickerTimeProps = TimeFormatOptions & {
  /**
   * Start hour (inclusive) for the time range, 0-24.
   * @default 0
   */
  startHour?: Hour;

  /**
   * End hour (exclusive) for the time range, 0-24.
   * When `endHour` is less than or equal to `startHour`, the range rolls over to the next day.
   * @default 24
   */
  endHour?: Hour;

  /**
   * Time increment, in minutes, of the options in the listbox.
   * @default 30
   */
  increment?: number;

  /**
   * The date in which all listbox options are based off of.
   * Defaults to the selected time, or the current date on mount.
   */
  dateAnchor?: Date;

  /**
   * Currently selected time in the TimePicker, for controlled scenarios.
   */
  selectedTime?: Date | null;

  /**
   * Default selected time in the TimePicker, for uncontrolled scenarios.
   */
  defaultSelectedTime?: Date | null;

  /**
   * Callback for when a time selection is made.
   */
  onSelectedTimeChange?: EventHandler<TimePickerSelectedTimeChangeData>;

  /**
   * Customizes the formatting of date strings displayed in listbox options.
   */
  formatDateToTimeString?: (date: Date, options: TimeFormatOptions) => string;

  /**
   * In the freeform TimePicker, customizes the parsing from the input time string into a Date and provides custom validation.
   */
  parseTimeStringToDate?: (time: string | undefined) => TimeStringValidationResult;
};

/**
 * TimePicker Props
 */
export type TimePickerProps = Omit<ComponentProps<Partial<TimePickerSlots>, 'input'>, 'children' | 'size'> &
  Pick<
    ComboboxProps,
    | 'appearance'
    | 'clearable'
    | 'defaultOpen'
    | 'defaultValue'
    | 'freeform'
    | 'inlinePopup'
    | 'mountNode'
    | 'onOpenChange'
    | 'open'
    | 'placeholder'
    | 'positioning'
    | 'size'
    | 'value'
  > &
  TimePickerTimeProps;

/**
 * TimePicker Props without design-only props.
 */
export type TimePickerBaseProps = DistributiveOmit<TimePickerProps, 'appearance' | 'size'>;

/**
 * TimePicker specific state, shared by the styled and headless TimePicker.
 */
export type TimePickerTimeState = Required<Pick<TimePickerProps, 'freeform' | 'parseTimeStringToDate'>> & {
  /**
   * Submitted text from the input field. It is used to determine if the input value has changed when user submit a new value on Enter or blur from input.
   */
  submittedText: string | undefined;
};

/**
 * State used in rendering TimePicker
 */
export type TimePickerState = ComboboxState & TimePickerTimeState;

/**
 * State used in rendering TimePicker, without design-only state.
 */
export type TimePickerBaseState = DistributiveOmit<TimePickerState, 'appearance' | 'size'>;

export type TimePickerContextValues = ComboboxContextValues;
