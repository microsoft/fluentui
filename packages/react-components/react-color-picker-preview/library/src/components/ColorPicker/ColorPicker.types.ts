import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ColorPickerSlots = {
  root: Slot<'div'>;
};

/**
 * ColorPicker Props
 */
export type ColorPickerProps = ComponentProps<ColorPickerSlots> & {};

/**
 * State used in rendering ColorPicker
 */
export type ColorPickerState = ComponentState<ColorPickerSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ColorPickerProps.
// & Required<Pick<ColorPickerProps, 'propName'>>
