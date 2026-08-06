import type {
  ImageSwatchBaseProps,
  ImageSwatchBaseState,
  ImageSwatchSlots as ImageSwatchBaseSlots,
} from '@fluentui/react-swatch-picker';

export type ImageSwatchProps = ImageSwatchBaseProps;

export type ImageSwatchSlots = ImageSwatchBaseSlots;

export type ImageSwatchState = ImageSwatchBaseState & {
  root: {
    'data-selected'?: string;
  };
};
