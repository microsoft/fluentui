import type { DatePickerBaseProps, DatePickerBaseState } from '@fluentui/react-datepicker-preview';
import type { ComponentState, RefAttributes, Slot } from '@fluentui/react-utilities';
import type { Input } from '../Input';
import type { CalendarProps } from '../Calendar';
import type { PositioningShorthand } from '../../positioning';

export type {
  DatePickerDateChangeData,
  DatePickerErrorType,
  DatePickerOpenChangeData,
  DatePickerValidationResultData,
} from '@fluentui/react-datepicker-preview';

/** Semantic slots; no default icons, Fluent styles, or motion are applied. */
export type DatePickerSlots = {
  root: NonNullable<Slot<typeof Input>>;
  calendar: NonNullable<
    Slot<
      Omit<CalendarProps, 'value' | 'defaultValue' | 'today' | 'minDate' | 'maxDate'> & RefAttributes<HTMLDivElement>
    >
  >;
  trigger: NonNullable<Slot<'button'>>;
  popupSurface: NonNullable<Slot<'dialog'>>;
};

/**
 * An unstyled date input and native modal calendar dialog.
 * The popup stays in the input's document and uses the browser top layer rather than a Portal.
 */
export type DatePickerProps = Omit<
  DatePickerBaseProps,
  'calendar' | 'popupSurface' | 'inlinePopup' | 'mountNode' | 'positioning'
> & {
  calendar?: DatePickerSlots['calendar'];
  trigger?: DatePickerSlots['trigger'];
  popupSurface?: DatePickerSlots['popupSurface'];
  positioning?: PositioningShorthand;
};

export type DatePickerState = ComponentState<DatePickerSlots> &
  Pick<DatePickerBaseState, 'open'> & {
    /** Keep the native surface mounted until its close/focus restoration completes. */
    renderSurface: boolean;
    root: {
      root: {
        /** Present while the calendar is open. */
        'data-open'?: '';
        /** Present when the input and trigger are disabled. */
        'data-disabled'?: '';
        /** Present when the input is marked invalid. */
        'data-invalid'?: '';
      };
    };
  };
