import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SwatchPickerProps } from '../SwatchPicker/SwatchPicker.types';

export type EmptySwatchSlots = {
  root: Slot<'button'>;
};

/**
 * EmptySwatch Props
 */
export type EmptySwatchProps = ComponentProps<EmptySwatchSlots> & Pick<SwatchPickerProps, 'size' | 'shape'>;

/**
 * State used in rendering EmptySwatch
 */
export type EmptySwatchState = ComponentState<EmptySwatchSlots> & Pick<EmptySwatchProps, 'size' | 'shape'>;
