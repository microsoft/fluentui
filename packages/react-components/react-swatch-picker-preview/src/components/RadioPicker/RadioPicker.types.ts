import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type RadioPickerSlots = {
  root: Slot<'div'>;
};

/**
 * RadioPicker Props
 */
export type RadioPickerProps = ComponentProps<RadioPickerSlots> & {};

/**
 * State used in rendering RadioPicker
 */
export type RadioPickerState = ComponentState<RadioPickerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from RadioPickerProps.
// & Required<Pick<RadioPickerProps, 'propName'>>
