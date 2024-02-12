import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type PickerButtonSlots = {
  root: Slot<'button'>;
};

/**
 * PickerButton Props
 */
export type PickerButtonProps = ComponentProps<PickerButtonSlots> & {};

/**
 * State used in rendering PickerButton
 */
export type PickerButtonState = ComponentState<PickerButtonSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from PickerButtonProps.
// & Required<Pick<PickerButtonProps, 'propName'>>
