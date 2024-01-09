import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type TablePickerSlots = {
  root: Slot<'table'>;
  tbody: Slot<'tbody'>;
};

/**
 * TablePicker Props
 */
export type TablePickerProps = ComponentProps<TablePickerSlots> & {};

/**
 * State used in rendering TablePicker
 */
export type TablePickerState = ComponentState<TablePickerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from TablePickerProps.
// & Required<Pick<TablePickerProps, 'propName'>>
