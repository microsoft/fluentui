import type * as React from 'react';
import type {
  BaseComboboxState,
  ComboboxContextValues,
  ComboboxProps,
  ComboboxSlots,
  ComboboxState,
} from '@fluentui/react-combobox';
import type { ComponentProps, DistributiveOmit, EventData, EventHandler } from '@fluentui/react-utilities';
import type { Hour, TimeFormatOptions, TimePickerErrorType, TimeStringValidationResult } from '../../utils/types';

export type TimePickerSlots = ComboboxSlots;

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
   * When `endHour` is less than `startHour`, the range rolls over to the next day.
   * @default 24
   */
  endHour?: Hour;

  /**
   * Time increment, in minutes of elapsed time, of the options in the listbox. Must be a finite positive integer.
   * @default 30
   */
  increment?: number;

  /**
   * The date in which all listbox options are based off of.
   * Defaults to the initial `value` or `defaultValue`, or the current date on mount. It is resolved once and does not
   * follow later changes of `value`. Required when the range crosses midnight (`endHour` less than `startHour`).
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
  Pick<
    ComboboxProps,
    | 'appearance'
    | 'clearable'
    | 'defaultOpen'
    | 'freeform'
    | 'inlinePopup'
    | 'mountNode'
    | 'onOpenChange'
    | 'open'
    | 'placeholder'
    | 'positioning'
    | 'size'
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
   * Display text after the last change. A commit happens only when the typed text differs from it.
   */
  committedText: string | undefined;
};

/**
 * The part of the Combobox props read by `useTimePickerSelection_unstable`.
 */
export type TimePickerComboboxProps = Pick<ComboboxProps, 'clearable' | 'freeform' | 'onBlur' | 'onOpenChange'>;

/**
 * The part of a Combobox state required by `useTimePickerComboboxState_unstable`.
 */
export type TimePickerComboboxState = Pick<
  BaseComboboxState,
  'root' | 'input' | 'listbox' | 'expandIcon' | 'clearIcon' | 'value' | 'getOptionById' | 'activeDescendantController'
>;

/**
 * State used in rendering TimePicker
 */
export type TimePickerState = ComboboxState & TimePickerTimeState;

/**
 * State used in rendering TimePicker, without design-only state.
 */
export type TimePickerBaseState = DistributiveOmit<TimePickerState, 'appearance' | 'size'>;

export type TimePickerContextValues = ComboboxContextValues;
