import type {
  ImageSwatchProps as ImageSwatchBaseProps,
  ImageSwatchState as ImageSwatchBaseState,
} from '@fluentui/react-headless-components-preview/swatch-picker';
export type { ImageSwatchSlots } from '@fluentui/react-headless-components-preview/swatch-picker';

export type ImageSwatchProps = ImageSwatchBaseProps & {
  size?: 'extra-small' | 'small' | 'medium' | 'large';
  shape?: 'rounded' | 'square' | 'circular';
};

export type ImageSwatchState = ImageSwatchBaseState & {
  size: NonNullable<ImageSwatchProps['size']>;
  shape: NonNullable<ImageSwatchProps['shape']>;
  root: ImageSwatchBaseState['root'] & {
    'data-size': NonNullable<ImageSwatchProps['size']>;
    'data-shape': NonNullable<ImageSwatchProps['shape']>;
  };
};
