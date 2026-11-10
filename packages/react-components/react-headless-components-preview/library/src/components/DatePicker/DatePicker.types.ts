import type * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  EventData,
  EventHandler,
  RefAttributes,
  Slot,
} from '@fluentui/react-utilities';
import type { PositioningShorthand } from '../../hooks/usePositioning';
import type { Calendar, CalendarProps } from '../Calendar';

/**
 * Slots available to the DatePicker component.
 */
export type DatePickerSlots = {
  /**
   * Field chrome wrapping the field control and the calendar icon. Receives `className` and `style`; every other
   * native prop is forwarded to the field control.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The editable field control, rendered only when `allowTextInput` is set. Receives the forwarded ref.
   */
  input?: NonNullable<Slot<'input'>>;

  /**
   * The non-editable field control, rendered unless `allowTextInput` is set. Receives the forwarded ref.
   */
  trigger?: NonNullable<Slot<'button'>>;

  /**
   * Displays the formatted selected date, or the placeholder when empty, inside the trigger.
   */
  displayValue: NonNullable<Slot<'span'>>;

  /**
   * The trailing calendar icon. It is decorative inside the trigger. With `allowTextInput`, it is a button that toggles
   * the calendar on click, Enter or Space without adding a tab stop. Provide the icon as its children.
   */
  icon?: Slot<'span'>;

  /**
   * Correction text for a rejected typed date. It is a polite live region rendered after the field and referenced by
   * the field's `aria-describedby` while the error is shown. Set to `null` to show the error through a Field instead.
   */
  errorMessage?: Slot<'div'>;

  /**
   * The non-modal calendar dialog, mounted only while open and shown in the top layer with the Popover API.
   */
  popupSurface: NonNullable<Slot<'div'>>;

  /**
   * The Calendar shown in the popup. Selection, boundaries and today are owned by DatePicker.
   */
  calendar: NonNullable<Slot<typeof Calendar>>;
};

/**
 * Why a typed or committed date was rejected.
 */
export type DatePickerErrorType = 'invalid-input' | 'out-of-bounds' | 'required-input';

/**
 * Data reported when the committed date changes.
 */
export type DatePickerDateChangeData = EventData<string, React.SyntheticEvent | Event> & {
  /**
   * The newly committed date, or `null` when the field was cleared.
   */
  value: Date | null;

  /**
   * How the date was committed.
   */
  reason: 'calendar' | 'input' | 'clear';
};

/**
 * Data reported after DatePicker validates pending text or a calendar selection.
 */
export type DatePickerValidationResultData = EventData<string, React.SyntheticEvent | Event> & {
  /**
   * The validation error, or `undefined` when the value was accepted.
   */
  error?: DatePickerErrorType;
};

/**
 * Data reported for a requested popup visibility change.
 */
export type DatePickerOpenChangeData = EventData<string, React.SyntheticEvent | Event> & {
  /**
   * The requested open state.
   */
  open: boolean;

  /**
   * What requested the change.
   * - `trigger`: activation of the non-editable field
   * - `icon`: click on the calendar icon
   * - `keyboard`: Alt + Arrow Down, or Escape on the field
   * - `selection`: a day was selected
   * - `escape`: Escape inside the calendar
   * - `focusOut`: focus left the calendar
   * - `outsideClick`: a pointer press outside the date picker
   */
  reason: 'trigger' | 'icon' | 'keyboard' | 'selection' | 'escape' | 'focusOut' | 'outsideClick';
};

/**
 * Data passed to `formatErrorMessage`.
 */
export type DatePickerErrorMessageData = {
  /**
   * The validation error to describe.
   */
  error: DatePickerErrorType;

  /**
   * The inclusive lower boundary, if any.
   */
  minDate?: Date;

  /**
   * The inclusive upper boundary, if any.
   */
  maxDate?: Date;

  /**
   * Formats a date the same way the field does.
   */
  formatDate: (date: Date) => string;
};

/**
 * Calendar configuration accepted by DatePicker. Selection, boundaries and today belong on DatePicker.
 */
export type DatePickerCalendarProps = Omit<
  CalendarProps,
  'value' | 'defaultValue' | 'today' | 'minDate' | 'maxDate' | 'displayedDate' | 'defaultDisplayedDate'
>;

/**
 * Native props that DatePicker owns or that do not apply to its field control.
 */
type DatePickerOmittedNativeProps =
  | 'calendar'
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'type'
  | 'readOnly'
  | 'placeholder'
  | 'children'
  | 'required';

/**
 * Props shared by both DatePicker field controls.
 */
export type DatePickerBaseProps = {
  /**
   * Calendar configuration. Selection, boundaries and today are owned by DatePicker.
   */
  calendar?: NonNullable<Slot<DatePickerCalendarProps>>;

  /**
   * The committed date. `null` represents an explicitly empty controlled value.
   */
  value?: Date | null;

  /**
   * The initially committed date when uncontrolled.
   */
  defaultValue?: Date | null;

  /**
   * Called when a calendar selection, accepted typed date, or clearing the field changes the committed date.
   */
  onDateChange?: EventHandler<DatePickerDateChangeData>;

  /**
   * Called after typed text or a calendar selection is validated.
   */
  onValidationResult?: EventHandler<DatePickerValidationResultData>;

  /**
   * Shown while no date is committed.
   * @default 'Select a date'
   */
  placeholder?: string;

  /**
   * Sets `aria-required` on the field control. A surrounding Field owns the visual required affordance.
   * @default false
   */
  required?: boolean;

  /**
   * Controlled popup visibility.
   */
  open?: boolean;

  /**
   * Initial popup visibility when uncontrolled.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Called when user interaction requests a popup visibility change.
   */
  onOpenChange?: EventHandler<DatePickerOpenChangeData>;

  /**
   * Shows the calendar's Go-to-today button, which shows today's month and focuses today. Style the button through
   * `calendar.goToTodayButton`.
   * @default false
   */
  showGoToToday?: boolean;

  /**
   * Value of today. Pass this explicitly while server rendering to keep server and client output consistent.
   */
  today?: Date;

  /**
   * Inclusive local-date lower boundary for calendar and typed dates.
   */
  minDate?: Date;

  /**
   * Inclusive local-date upper boundary for calendar and typed dates.
   */
  maxDate?: Date;

  /**
   * Formats the committed date for display.
   * @default English long date, such as "August 12, 2026"
   */
  formatDate?: (date: Date) => string;

  /**
   * Parses typed text into a local date, returning `null` when the text is not a valid date.
   * The default accepts `YYYY-MM-DD`, an English month name followed by day and four-digit year, and `M/D/YYYY`.
   */
  parseDate?: (text: string) => Date | null;

  /**
   * Describes a validation error in `errorMessage`, including an accepted format or the allowed range.
   */
  formatErrorMessage?: (data: DatePickerErrorMessageData) => string;

  /**
   * Where the popup opens relative to the field.
   * @default { position: 'below', align: 'start' }
   */
  positioning?: PositioningShorthand;
};

/**
 * Props for a DatePicker with a non-editable field. Native props and the forwarded ref target the `<button>` trigger.
 */
export type DatePickerButtonProps = Omit<
  ComponentProps<Partial<DatePickerSlots>, 'trigger'>,
  DatePickerOmittedNativeProps
> &
  DatePickerBaseProps & {
    /**
     * Renders an editable text input instead of a non-editable trigger.
     * @default false
     */
    allowTextInput?: false;
  };

/**
 * Props for a DatePicker that accepts typed dates. Native props and the forwarded ref target the `<input>`.
 */
export type DatePickerInputProps = Omit<
  ComponentProps<Partial<DatePickerSlots>, 'input'>,
  DatePickerOmittedNativeProps
> &
  DatePickerBaseProps & {
    /**
     * Renders an editable text input instead of a non-editable trigger.
     */
    allowTextInput: true;
  };

/**
 * Props for the DatePicker component, discriminated by `allowTextInput`. Native props and the forwarded ref are applied
 * to the field control: the `<input>` when `allowTextInput` is set, otherwise the `<button>`.
 */
export type DatePickerProps = DatePickerButtonProps | DatePickerInputProps;

/**
 * The DatePicker component type. Like `ForwardRefComponent`, but the forwarded ref follows `allowTextInput`: it is the
 * `<input>` when `allowTextInput` is set, otherwise the `<button>` trigger.
 */
export type DatePickerComponent = React.NamedExoticComponent<
  (DatePickerButtonProps & RefAttributes<HTMLButtonElement>) | (DatePickerInputProps & RefAttributes<HTMLInputElement>)
>;

/**
 * State used to render the DatePicker component.
 */
export type DatePickerState = ComponentState<DatePickerSlots> &
  Required<Pick<DatePickerBaseProps, 'open' | 'required'>> & {
    /**
     * Whether the field accepts typed dates.
     */
    allowTextInput: boolean;

    /**
     * Whether the date picker is disabled.
     */
    disabled: boolean;

    /**
     * The committed date.
     */
    value: Date | null;

    /**
     * The current validation error, if any.
     */
    error: DatePickerErrorType | undefined;

    root: {
      /**
       * Present while the calendar is open.
       */
      'data-open'?: string;

      /**
       * Present when the date picker is disabled.
       */
      'data-disabled'?: string;

      /**
       * Present while a validation error is shown.
       */
      'data-invalid'?: string;

      /**
       * Present when the field accepts typed dates.
       */
      'data-editable'?: string;

      /**
       * Present while no date is committed and the placeholder is shown.
       */
      'data-placeholder'?: string;
    };
  };
