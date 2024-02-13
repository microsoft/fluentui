import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { SwatchContextValue } from '../../contexts/swatch';

export type ColorSwatchSlots = {
  root: Slot<'button'>;
};

/**
 * ColorSwatch Props
 */
export type ColorSwatchProps = ComponentProps<ColorSwatchSlots> & {
  /**
   * Swatch color
   */
  color: string;

  /**
   * Swatch size
   * @defaultvalue 'medium'
   */
  size?: 'extraSmall' | 'small' | 'medium' | 'large';

  /**
   * Swatch shape
   * @defaultvalue 'square'
   */
  shape?: 'rounded' | 'square' | 'circular';
  /**
   * Swatch value
   */
  value: string;
};

/**
 * State used in rendering ColorSwatch
 */
export type ColorSwatchState = ComponentState<ColorSwatchSlots> &
  Pick<ColorSwatchProps, 'color' | 'size' | 'shape' | 'value'> &
  SwatchContextValue;
