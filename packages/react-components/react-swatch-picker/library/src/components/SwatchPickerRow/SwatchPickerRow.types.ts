import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { SwatchPickerProps } from '../SwatchPicker/SwatchPicker.types';

export type SwatchPickerRowSlots = {
  root: Slot<'div'>;
};

/**
 * SwatchPickerRow Props
 */
export type SwatchPickerRowProps = ComponentProps<SwatchPickerRowSlots>;

export type SwatchPickerRowBaseProps = ComponentProps<SwatchPickerRowSlots>;

/**
 * State used in rendering SwatchPickerRow
 */
export type SwatchPickerRowState = ComponentState<SwatchPickerRowSlots> & Pick<SwatchPickerProps, 'spacing'>;

export type SwatchPickerRowBaseState = ComponentState<SwatchPickerRowSlots>;
