import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SwatchPickerProps } from '../SwatchPicker/SwatchPicker.types';

export type ColorSwatchSlots = {
  root: NonNullable<Slot<'button'>>;
};

/**
 * ColorSwatch Props
 */
export type ColorSwatchProps = ComponentProps<ColorSwatchSlots> &
  Pick<SwatchPickerProps, 'size' | 'shape'> & {
    /**
     * Swatch color
     */
    color: string;

    /**
     * Swatch value
     */
    value: string;

    contrastColor?: string;
  };

/**
 * State used in rendering ColorSwatch
 */
export type ColorSwatchState = ComponentState<ColorSwatchSlots> &
  Pick<ColorSwatchProps, 'color' | 'size' | 'shape' | 'value'> & {
    selected: boolean;
  };
