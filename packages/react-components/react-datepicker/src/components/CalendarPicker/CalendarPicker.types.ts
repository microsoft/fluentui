import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CalendarPickerSlots = {
  root: Slot<'div'>;
};

/**
 * CalendarPicker Props
 */
export type CalendarPickerProps = ComponentProps<CalendarPickerSlots> & {};

/**
 * State used in rendering CalendarPicker
 */
export type CalendarPickerState = ComponentState<CalendarPickerSlots>;
// & Required<Pick<CalendarPickerProps, 'propName'>>
