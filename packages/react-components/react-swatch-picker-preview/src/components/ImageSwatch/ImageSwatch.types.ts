import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type ImageSwatchSlots = {
  root: Slot<'button'>;
  /**
   * Icon that renders either before or after the `children` as specified by the `iconPosition` prop.
   */
  icon?: Slot<'span'>;
};

/**
 * ImageSwatch Props
 */
export type ImageSwatchProps = ComponentProps<ImageSwatchSlots> & {
  value?: string;
  /**
   *  Disabled swatch.
   *
   * @default `false` (renders enabled)
   */
  disabled?: boolean;

  selected?: boolean;

  defaultSelected?: boolean;

  empty?: boolean;
};

/**
 * State used in rendering ImageSwatch
 */
export type ImageSwatchState = ComponentState<ImageSwatchSlots> &
  Pick<ImageSwatchProps, 'disabled' | 'selected' | 'empty' | 'value'>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from ImageSwatchProps.
// & Required<Pick<ImageSwatchProps, 'propName'>>
