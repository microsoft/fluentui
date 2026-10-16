import type {
  ColorSwatchProps as ColorSwatchBaseProps,
  ColorSwatchState as ColorSwatchBaseState,
} from '@fluentui/react-headless-components-preview/swatch-picker';
export type { ColorSwatchSlots } from '@fluentui/react-headless-components-preview/swatch-picker';

export type ColorSwatchProps = ColorSwatchBaseProps & {
  size?: 'extra-small' | 'small' | 'medium' | 'large';
  shape?: 'rounded' | 'square' | 'circular';
};

export type ColorSwatchState = ColorSwatchBaseState & {
  size: NonNullable<ColorSwatchProps['size']>;
  shape: NonNullable<ColorSwatchProps['shape']>;
  root: ColorSwatchBaseState['root'] & {
    'data-size': NonNullable<ColorSwatchProps['size']>;
    'data-shape': NonNullable<ColorSwatchProps['shape']>;
  };
};
