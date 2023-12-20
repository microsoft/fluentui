import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SwatchPickerSlots = {
  root: Slot<'div'>;
  row: Slot<'div'>;
  swatch: Slot<'button'>;
};

/**
 * SwatchPicker Props
 */
export type SwatchPickerProps = ComponentProps<SwatchPickerSlots> & {};

/**
 * State used in rendering SwatchPicker
 */
export type SwatchPickerState = ComponentState<SwatchPickerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SwatchPickerProps.
// & Required<Pick<SwatchPickerProps, 'propName'>>
