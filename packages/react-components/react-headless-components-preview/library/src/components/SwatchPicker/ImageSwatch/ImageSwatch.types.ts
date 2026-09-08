import type { ImageSwatchBaseState } from '@fluentui/react-swatch-picker';

export type { ImageSwatchSlots, ImageSwatchBaseProps as ImageSwatchProps } from '@fluentui/react-swatch-picker';

export type ImageSwatchState = ImageSwatchBaseState & {
  root: {
    /**
     * Whether ImageSwatch is selected
     */
    'data-selected'?: string;
  };
};
