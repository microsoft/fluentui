import type {
  ColorPickerProps as ColorPickerBaseProps,
  ColorPickerState as ColorPickerBaseState,
} from '@fluentui/react-headless-components-preview/color-picker';
export type { ColorPickerSlots } from '@fluentui/react-headless-components-preview/color-picker';

export type ColorPickerProps = ColorPickerBaseProps & {
  /**
   * The shape shared by color picker controls.
   *
   * @default 'rounded'
   */
  shape?: 'rounded' | 'square';
};

export type ColorPickerState = ColorPickerBaseState & {
  shape: NonNullable<ColorPickerProps['shape']>;
  root: ColorPickerBaseState['root'] & {
    'data-shape': NonNullable<ColorPickerProps['shape']>;
  };
};
