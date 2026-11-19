import type {
  ColorSliderProps as ColorSliderHeadlessProps,
  ColorSliderState as ColorSliderHeadlessState,
} from '@fluentui/react-headless-components-preview/color-picker';

import type { ColorPickerShape } from '../ColorPicker/ColorPicker.types';

export type { ColorSliderSlots } from '@fluentui/react-headless-components-preview/color-picker';

/**
 * Windmod ColorSlider props: the headless slider plus the look prop the headless surface
 * deliberately omits.
 */
export type ColorSliderProps = ColorSliderHeadlessProps & {
  /** @default the enclosing ColorPicker's shape, then 'rounded' */
  shape?: ColorPickerShape;
};

/** Windmod ColorSlider state: headless state plus the resolved look prop. */
export type ColorSliderState = ColorSliderHeadlessState & Required<Pick<ColorSliderProps, 'shape'>>;
