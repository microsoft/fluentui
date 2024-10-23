import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SwatchPickerProps } from '../SwatchPicker/SwatchPicker.types';

export type ColorSwatchSlots = {
  root: NonNullable<Slot<'button'>>;
  icon?: Slot<'span'>;
  disabledIcon?: Slot<'span'>;
};

/**
 * ColorSwatch Props
 */
export type ColorSwatchProps = ComponentProps<ColorSwatchSlots> &
  Pick<SwatchPickerProps, 'size' | 'shape'> & {
    /**
     * Border color when contrast is low
     */
    borderColor?: string;

    /**
     * Swatch color
     */
    color: string;

    /**
     * Whether the swatch is disabled
     */
    disabled?: boolean;

    /**
     * Swatch value
     */
    value: string;
  };

/**
 * State used in rendering ColorSwatch
 */
export type ColorSwatchState = ComponentState<ColorSwatchSlots> &
  Pick<ColorSwatchProps, 'color' | 'disabled' | 'size' | 'shape' | 'value'> & {
    selected: boolean;
  };
