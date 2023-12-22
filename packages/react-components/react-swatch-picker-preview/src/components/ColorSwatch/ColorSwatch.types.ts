import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ColorSwatchSlots = {
  root: Slot<'button'>;
  /**
   * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
   */
  icon?: Slot<'span'>;
};

/**
 * ColorSwatch Props
 */
export type ColorSwatchProps = ComponentProps<ColorSwatchSlots> & {
  color?: string;
  /**
   *  Disabled swatch.
   *
   * @default `false` (renders enabled)
   */
  disabled?: boolean;

  selected?: boolean;
};

/**
 * State used in rendering ColorSwatch
 */
export type ColorSwatchState = ComponentState<ColorSwatchSlots> & Pick<ColorSwatchProps, 'disabled' | 'selected'>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ColorSwatchProps.
// & Required<Pick<ColorSwatchProps, 'propName'>>
