import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SwatchPickerRowSlots = {
  root: Slot<'div'>;
};

/**
 * SwatchPickerRow Props
 */
export type SwatchPickerRowProps = ComponentProps<SwatchPickerRowSlots> & {};

/**
 * State used in rendering SwatchPickerRow
 */
export type SwatchPickerRowState = ComponentState<SwatchPickerRowSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from SwatchPickerRowProps.
// & Required<Pick<SwatchPickerRowProps, 'propName'>>
