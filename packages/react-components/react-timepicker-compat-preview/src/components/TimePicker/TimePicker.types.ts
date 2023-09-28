import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TimePickerSlots = {
  root: Slot<'div'>;
};

/**
 * TimePicker Props
 */
export type TimePickerProps = ComponentProps<TimePickerSlots> & {};

/**
 * State used in rendering TimePicker
 */
export type TimePickerState = ComponentState<TimePickerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TimePickerProps.
// & Required<Pick<TimePickerProps, 'propName'>>
