import type {
  AlphaSliderProps as AlphaSliderHeadlessProps,
  AlphaSliderState as AlphaSliderHeadlessState,
} from '@fluentui/react-headless-components-preview/color-picker';

import type { ColorPickerShape } from '../ColorPicker/ColorPicker.types';

export type { AlphaSliderSlots } from '@fluentui/react-headless-components-preview/color-picker';

/**
 * Windmod AlphaSlider props: the headless slider plus the look prop the headless surface
 * deliberately omits.
 */
export type AlphaSliderProps = AlphaSliderHeadlessProps & {
  /** @default the enclosing ColorPicker's shape, then 'rounded' */
  shape?: ColorPickerShape;
};

/** Windmod AlphaSlider state: headless state plus the resolved look prop. */
export type AlphaSliderState = AlphaSliderHeadlessState & Required<Pick<AlphaSliderProps, 'shape'>>;
