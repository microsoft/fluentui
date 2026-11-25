import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { SwatchPickerProps } from '../SwatchPicker/SwatchPicker.types';

export type EmptySwatchSlots = {
  root: Slot<'button'>;
};

/**
 * EmptySwatch Props
 */
export type EmptySwatchProps = ComponentProps<EmptySwatchSlots> & Pick<SwatchPickerProps, 'size' | 'shape'>;

export type EmptySwatchBaseProps = ComponentProps<EmptySwatchSlots>;

/**
 * State used in rendering EmptySwatch
 */
export type EmptySwatchState = ComponentState<EmptySwatchSlots> & Pick<EmptySwatchProps, 'size' | 'shape'>;

export type EmptySwatchBaseState = ComponentState<EmptySwatchSlots>;
