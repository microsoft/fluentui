import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import { Color, DefaultColor } from '../../contexts/picker';

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
export type ColorSwatchProps<T extends Color> = ComponentProps<ColorSwatchSlots> &
  T & {
    // color: T;
    /**
     *  Disabled swatch.
     *
     * @default `false` (renders enabled)
     */
    disabled?: boolean;

    selected?: boolean;

    defaultSelected?: boolean;

    empty?: boolean;

    contrastBorderColor?: string;
    contrastStateColor?: string;
  };

/**
 * State used in rendering ColorSwatch
 */
export type ColorSwatchState<T extends Color = DefaultColor> = ComponentState<ColorSwatchSlots> &
  Pick<ColorSwatchProps<T>, 'disabled' | 'selected' | 'empty' | 'value'>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ColorSwatchProps.
// & Required<Pick<ColorSwatchProps, 'propName'>>
