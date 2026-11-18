import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { ComboboxProps, ComboboxSlots, ComboboxState } from '../Combobox/Combobox.types';
import type { TimeFormatOptions, TimePickerErrorType, TimeStringValidationResult } from './utils/types';

export type { ComboboxContextValues as TimePickerContextValues } from '../Combobox/Combobox.types';

/**
 * TimePicker slots. Clear is a native button and is the only additional tab stop after the input.
 */
export type TimePickerSlots = Omit<ComboboxSlots, 'clearIcon'> & {
  clearIcon?: Slot<'button'>;
};

/**
 * Data passed to the `onChange` callback.
 *
 * `type` narrows `event`: `click` for a select or a clear, `keydown` for Enter,
 * `blur` for a commit when focus leaves the TimePicker.
 */
export type TimePickerOnChangeData = {
  /**
   * The new value: the selected option's time, the time parsed from the typed text, or null.
   */
  value: Date | null;

  /**
   * The display text after the change.
   */
  displayValue: string | undefined;

  /**
   * The error type when a commit failed.
   */
  errorType: TimePickerErrorType | undefined;
} & (
  | EventData<'click', React.MouseEvent<HTMLElement>>
  | EventData<'keydown', React.KeyboardEvent<HTMLElement>>
  | EventData<'blur', React.FocusEvent<HTMLElement>>
);

/**
 * Payload of a change, without the event part of `TimePickerOnChangeData`.
 */
export type TimePickerCommitData = Pick<TimePickerOnChangeData, 'value' | 'displayValue' | 'errorType'>;

/**
 * TimePicker specific props.
 */
export type TimePickerTimeProps = TimeFormatOptions & {
  /**
   * Accepts valid custom times between suggestions. Set to false to restrict selection to generated options.
   * @default true
   */
  freeform?: boolean;

  /**
   * Start hour (inclusive) for the time range, 0-24.
   * @default 0
   */
  startHour?: number;

  /**
   * End hour (exclusive) for the time range, 0-24.
   * When `endHour` is less than `startHour`, the range rolls over to the next day.
   * @default 24
   */
  endHour?: number;

  /**
   * Time increment, in minutes of elapsed time, of the options in the listbox. Must be a finite positive integer.
   * @default 30
   */
  increment?: number;

  /**
   * The date in which all listbox options are based off of.
   * Defaults to the day of the last valid `value` or `defaultValue`, or the current date on mount.
   * Required when the range crosses midnight (`endHour` less than `startHour`): without it, such a range keeps the
   * day of the initial value.
   */
  dateAnchor?: Date;

  /**
   * Currently selected time in the TimePicker, for controlled scenarios.
   */
  value?: Date | null;

  /**
   * Default selected time in the TimePicker, for uncontrolled scenarios.
   */
  defaultValue?: Date | null;

  /**
   * Callback for a change: a select, a commit of the typed text on Enter or blur in freeform mode, or a clear.
   * It is not called on every keystroke; use `onInput` for that.
   */
  onChange?: EventHandler<TimePickerOnChangeData>;

  /**
   * Customizes the formatting of the option text and the display text.
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
export type TimePickerProps = Omit<
  ComponentProps<Partial<TimePickerSlots>, 'input'>,
  'children' | 'size' | 'value' | 'defaultValue' | 'onChange'
> &
  Pick<ComboboxProps, 'clearable' | 'defaultOpen' | 'onOpenChange' | 'open' | 'placeholder' | 'positioning'> &
  TimePickerTimeProps;

/**
 * TimePicker specific state.
 */
export type TimePickerTimeState = Required<Pick<TimePickerProps, 'freeform' | 'parseTimeStringToDate'>> & {
  /**
   * The last validation error, cleared on an accepted value or Escape.
   */
  errorType: TimePickerErrorType | undefined;

  /**
   * Display text after the last change. A commit happens only when the typed text differs from it.
   */
  committedText: string | undefined;
};

/**
 * State used in rendering TimePicker
 */
export type TimePickerState = Omit<ComboboxState, 'components' | 'clearIcon'> &
  ComponentState<TimePickerSlots> &
  TimePickerTimeState & {
    root: {
      /**
       * Whether the TimePicker accepts freeform input.
       */
      'data-freeform'?: string;
    };
  };
