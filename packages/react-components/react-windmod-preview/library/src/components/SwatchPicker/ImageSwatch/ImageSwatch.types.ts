import type {
  ImageSwatchProps as ImageSwatchHeadlessProps,
  ImageSwatchState as ImageSwatchHeadlessState,
} from '@fluentui/react-headless-components-preview/swatch-picker';

import type { SwatchPickerShape, SwatchPickerSize } from '../SwatchPicker.types';

export type { ImageSwatchSlots } from '@fluentui/react-headless-components-preview/swatch-picker';

/**
 * Windmod ImageSwatch props: the headless image swatch unchanged. It takes no size or shape prop
 * on either library — both read the picker context.
 */
export type ImageSwatchProps = ImageSwatchHeadlessProps;

/** Windmod ImageSwatch state: headless state plus the look props resolved from the context. */
export type ImageSwatchState = ImageSwatchHeadlessState & {
  size: SwatchPickerSize;
  shape: SwatchPickerShape;
};
