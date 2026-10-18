import type * as React from 'react';
import type { Calendar, CalendarProps } from '@fluentui/react-calendar-preview';
import type { Input } from '@fluentui/react-input';
import type { PortalProps } from '@fluentui/react-portal';
import type { PositioningProps } from '@fluentui/react-positioning';
import type {
  ComponentProps,
  ComponentState,
  EventData,
  EventHandler,
  RefAttributes,
  Slot,
} from '@fluentui/react-utilities';
import type { DatePickerDateState, DatePickerDateStateOptions } from './useDatePickerDateState';

export type {
  DatePickerDateChangeData,
  DatePickerErrorType,
  DatePickerValidationResultData,
} from './useDatePickerDateState';

export type DatePickerSlots = {
  /** Input wrapper. The forwarded DatePicker ref targets the native input. */
  root: NonNullable<Slot<typeof Input>>;
  /** Calendar configuration; selection and shared boundaries are owned by DatePicker. */
  calendar: NonNullable<Slot<typeof Calendar>>;
  /** Named dialog, mounted only while open. */
  popupSurface?: Slot<'div'>;
};

/** Data reported for a requested popup visibility transition. */
export type DatePickerOpenChangeData = EventData<string, React.SyntheticEvent | Event> & {
  open: boolean;
  reason: 'input' | 'icon' | 'keyboard' | 'focus' | 'selection' | 'dismiss';
};

/** A date input with a dismissible Calendar Preview dialog. */
export type DatePickerProps = Omit<
  ComponentProps<Partial<DatePickerSlots>>,
  'value' | 'defaultValue' | 'type' | 'readOnly' | 'calendar'
> &
  Omit<DatePickerDateStateOptions, 'isDateUnavailable'> & {
    /** Calendar-only configuration. Shared selection and date boundaries belong on DatePicker. */
    calendar?: NonNullable<
      Slot<
        Omit<CalendarProps, 'value' | 'defaultValue' | 'today' | 'minDate' | 'maxDate'> & RefAttributes<HTMLDivElement>
      >
    >;
    /** Controlled popup visibility. */
    open?: boolean;
    /** Initial uncontrolled popup visibility. @default false */
    defaultOpen?: boolean;
    onOpenChange?: EventHandler<DatePickerOpenChangeData>;
    /** Open from the input body; the icon and keyboard remain available. @default true */
    openOnClick?: boolean;
    /** Open on focus in selection-only mode. @default false */
    openOnFocus?: boolean;
    /** Reference date shared with Calendar; does not select a date. */
    today?: Date;
    /** Inclusive local-date lower boundary. */
    minDate?: Date;
    /** Inclusive local-date upper boundary. */
    maxDate?: Date;
    /** Render beside the input instead of in a Portal. @default false */
    inlinePopup?: boolean;
    mountNode?: PortalProps['mountNode'];
    positioning?: PositioningProps;
  };

/** Props for behavior without DatePicker styling defaults. */
export type DatePickerBaseProps = Omit<DatePickerProps, 'appearance' | 'size'>;

/** State used in rendering DatePicker. */
export type DatePickerState = ComponentState<DatePickerSlots> &
  Required<Pick<DatePickerProps, 'allowTextInput' | 'disabled' | 'inlinePopup'>> &
  Pick<DatePickerProps, 'mountNode'> & {
    open: boolean;
  };

/** Behavior shared by styled and custom-design-system integrations, without Tabster or visual slots. */
export type DatePickerBaseState = DatePickerDateState & {
  open: boolean;
  today: Date;
  required?: boolean;
  requestOpen: (event: React.SyntheticEvent | Event, open: boolean, reason: DatePickerOpenChangeData['reason']) => void;
};
