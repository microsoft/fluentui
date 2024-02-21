import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SwatchPickerProps } from '../SwatchPicker/SwatchPicker.types';

export type ColorSwatchSlots = {
  root: NonNullable<Slot<'div'>>;
  button: NonNullable<Slot<'button'>>;
  /**
   * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
   */
  icon?: Slot<'span'>;
  disabledIcon?: Slot<'span'>;
};

/**
 * ColorSwatch Props
 */
export type ColorSwatchProps = Omit<ComponentProps<Partial<ColorSwatchSlots>, 'button'>, 'children'> &
  Pick<SwatchPickerProps, 'size' | 'shape'> & {
    /**
     * Swatch color
     */
    color: string;

    /**
     * Swatch value
     */
    value: string;

    /**
     *  Disabled swatch.
     *
     * @default `false` (renders enabled)
     */
    disabled?: boolean;

    contrastBorderColor?: string;

    contrastStateColor?: string;

    size?: 'extraSmall' | 'small' | 'medium' | 'large';

    shape?: 'rounded' | 'square' | 'circular';
  };

/**
 * State used in rendering ColorSwatch
 */
export type ColorSwatchState = ComponentState<ColorSwatchSlots> &
  Pick<ColorSwatchProps, 'color' | 'size' | 'shape' | 'value' | 'disabled'> & {
    selected: boolean;
  };
