import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SwatchContextValue } from '../../contexts/swatch';

export type ColorSwatchSlots = {
  root: Slot<'button'>;
  /**
   * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
   */
  icon?: Slot<'span'>;
  disabledIcon?: Slot<'span'>;
};

/**
 * ColorSwatch Props
 */
export type ColorSwatchProps = ComponentProps<ColorSwatchSlots> & {
  /**
   *  Disabled swatch.
   *
   * @default `false` (renders enabled)
   */
  disabled?: boolean;

  color: string;

  contrastBorderColor?: string;

  contrastStateColor?: string;

  size?: 'extraSmall' | 'small' | 'medium' | 'large';

  shape?: 'rounded' | 'square' | 'circular';

  value: string;
};

/**
 * State used in rendering ColorSwatch
 */
export type ColorSwatchState = ComponentState<ColorSwatchSlots> &
  Pick<ColorSwatchProps, 'disabled' | 'color' | 'shape' | 'size' | 'value'> &
  SwatchContextValue;
