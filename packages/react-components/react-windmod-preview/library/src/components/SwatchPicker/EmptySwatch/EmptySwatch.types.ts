import type {
  EmptySwatchProps as EmptySwatchHeadlessProps,
  EmptySwatchState as EmptySwatchHeadlessState,
} from '@fluentui/react-headless-components-preview/swatch-picker';

import type { SwatchPickerShape, SwatchPickerSize } from '../SwatchPicker.types';

export type { EmptySwatchSlots } from '@fluentui/react-headless-components-preview/swatch-picker';

/**
 * Windmod EmptySwatch props: the headless empty swatch plus the look props the headless surface
 * deliberately omits. Both default to the picker context before falling back.
 */
export type EmptySwatchProps = EmptySwatchHeadlessProps & {
  /** @default the picker's size, then 'medium' */
  size?: SwatchPickerSize;
  /** @default the picker's shape, then 'square' */
  shape?: SwatchPickerShape;
};

/** Windmod EmptySwatch state: headless state plus the resolved look props. */
export type EmptySwatchState = EmptySwatchHeadlessState & Required<Pick<EmptySwatchProps, 'size' | 'shape'>>;
