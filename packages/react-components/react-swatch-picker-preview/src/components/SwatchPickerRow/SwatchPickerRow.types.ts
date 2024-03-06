import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type SwatchPickerRowSlots = {
  root: Slot<'div'>;
};

/**
 * SwatchPickerRow Props
 */
export type SwatchPickerRowProps = ComponentProps<SwatchPickerRowSlots>;

/**
 * State used in rendering SwatchPickerRow
 */
export type SwatchPickerRowState = ComponentState<SwatchPickerRowSlots>;
