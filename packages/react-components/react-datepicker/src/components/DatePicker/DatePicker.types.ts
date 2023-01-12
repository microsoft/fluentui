import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type DatePickerSlots = {
  root: Slot<'div'>;
};

/**
 * DatePicker Props
 */
export type DatePickerProps = ComponentProps<DatePickerSlots> & {};

/**
 * State used in rendering DatePicker
 */
export type DatePickerState = ComponentState<DatePickerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from DatePickerProps.
// & Required<Pick<DatePickerProps, 'propName'>>
