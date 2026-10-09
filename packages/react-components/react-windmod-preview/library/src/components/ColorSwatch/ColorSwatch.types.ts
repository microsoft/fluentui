import type {
  ColorSwatchProps as ColorSwatchHeadlessProps,
  ColorSwatchState as ColorSwatchHeadlessState,
} from '@fluentui/react-headless-components-preview/swatch-picker';

import type { SwatchPickerShape, SwatchPickerSize } from '../SwatchPicker/SwatchPicker.types';

export type { ColorSwatchSlots } from '@fluentui/react-headless-components-preview/swatch-picker';

/**
 * Windmod ColorSwatch props: the headless colour swatch plus the look props the headless surface
 * deliberately omits. Both default to the picker context before falling back.
 */
export type ColorSwatchProps = ColorSwatchHeadlessProps & {
  /** @default the picker's size, then 'medium' */
  size?: SwatchPickerSize;
  /** @default the picker's shape, then 'square' */
  shape?: SwatchPickerShape;
};

/** Windmod ColorSwatch state: headless state plus the resolved look props. */
export type ColorSwatchState = ColorSwatchHeadlessState & Required<Pick<ColorSwatchProps, 'size' | 'shape'>>;
