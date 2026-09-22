import type {
  EmptySwatchProps as EmptySwatchBaseProps,
  EmptySwatchState as EmptySwatchBaseState,
} from '@fluentui/react-headless-components-preview/swatch-picker';
export type { EmptySwatchSlots } from '@fluentui/react-headless-components-preview/swatch-picker';

export type EmptySwatchProps = EmptySwatchBaseProps & {
  size?: 'extra-small' | 'small' | 'medium' | 'large';
  shape?: 'rounded' | 'square' | 'circular';
};

export type EmptySwatchState = EmptySwatchBaseState & {
  size: NonNullable<EmptySwatchProps['size']>;
  shape: NonNullable<EmptySwatchProps['shape']>;
  root: EmptySwatchBaseState['root'] & {
    'data-size': NonNullable<EmptySwatchProps['size']>;
    'data-shape': NonNullable<EmptySwatchProps['shape']>;
  };
};
