import type {
  ColorSliderProps as ColorSliderBaseProps,
  ColorSliderState as ColorSliderBaseState,
} from '@fluentui/react-headless-components-preview/color-picker';
export type { ColorSliderSlots } from '@fluentui/react-headless-components-preview/color-picker';

export type ColorSliderProps = ColorSliderBaseProps & {
  /**
   * The shape of the slider rail.
   *
   * @default 'rounded'
   */
  shape?: 'rounded' | 'square';
};

export type ColorSliderState = ColorSliderBaseState & {
  shape: NonNullable<ColorSliderProps['shape']>;
  root: ColorSliderBaseState['root'] & {
    'data-shape': NonNullable<ColorSliderProps['shape']>;
  };
};
