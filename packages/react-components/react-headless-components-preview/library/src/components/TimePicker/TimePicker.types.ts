import type * as React from 'react';
import type { ComponentProps, EventData, EventHandler } from '@fluentui/react-utilities';
import type { ComboboxProps, ComboboxSlots as TimePickerSlots, ComboboxState } from '../Combobox/Combobox.types';
import type { TimeFormatOptions, TimePickerErrorType, TimeStringValidationResult } from './utils/types';

export type {
  ComboboxContextValues as TimePickerContextValues,
  ComboboxSlots as TimePickerSlots,
} from '../Combobox/Combobox.types';

/**
 * Data passed to the `onChange` callback.
 *
 * `type` narrows `event`: `click` for a select or a clear, `keydown` for Enter, Escape or a keyboard clear,
 * `blur` for a commit when focus leaves the TimePicker.
 */
export type TimePickerOnChangeData = {
  /**
   * The new value: the selected option's time, the time parsed from the typed text, or null.
   * When `errorType` is set, the commit failed and this is the current, unchanged value, except after emptying a
   * required input (`required-input`), where it is null.
   */
  value: Date | null;

  /**
   * The display text after the change.
   */
  displayValue: string | undefined;

  /**
   * The error type when a commit failed, or undefined when the commit succeeded or an earlier error was cleared
   * (for example by Escape). Use it to set the validation state of the surrounding Field.
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
   * Whether typed text that is not one of the options can be committed when it parses as a valid time in range.
   * Set to `false` to accept only the listed options.
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
   * Callback for each commit attempt: a select, a commit of the typed text on Enter or blur in freeform mode, or a
   * clear. A failed commit does not change the value: it is reported with an `errorType` and the unchanged `value`,
   * and the typed text stays in the input. Escape after a failed commit restores the committed text and reports
   * `errorType: undefined`. It is not called on every keystroke; use `onInput` for that.
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
export type TimePickerTimeState = Required<Pick<TimePickerProps, 'freeform' | 'parseTimeStringToDate'>> &
  Pick<TimePickerOnChangeData, 'errorType'> & {
    /**
     * Display text after the last commit attempt. A commit happens only when the typed text differs from it.
     */
    committedText: string | undefined;

    /**
     * Number of options rendered in the listbox after filtering by the typed text.
     */
    optionCount: number;
  };

/**
 * State used in rendering TimePicker
 */
export type TimePickerState = ComboboxState &
  TimePickerTimeState & {
    root: {
      /**
       * Whether the TimePicker accepts freeform input.
       */
      'data-freeform'?: string;
    };
    listbox?: {
      /**
       * Whether no option matches the typed text.
       */
      'data-empty'?: string;
    };
  };
