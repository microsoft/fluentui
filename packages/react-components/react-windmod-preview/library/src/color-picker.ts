export { ColorPicker, colorPickerClassNames, useColorPickerStyles } from './components/ColorPicker';
export type { ColorPickerProps, ColorPickerShape, ColorPickerSlots, ColorPickerState } from './components/ColorPicker';

export { AlphaSlider, alphaSliderClassNames, useAlphaSliderStyles } from './components/AlphaSlider';
export type { AlphaSliderProps, AlphaSliderSlots, AlphaSliderState } from './components/AlphaSlider';

export { ColorArea, colorAreaClassNames, useColorAreaStyles } from './components/ColorArea';
export type { ColorAreaProps, ColorAreaSlots, ColorAreaState } from './components/ColorArea';

export { ColorSlider, colorSliderClassNames, useColorSliderStyles } from './components/ColorSlider';
export type { ColorSliderProps, ColorSliderSlots, ColorSliderState } from './components/ColorSlider';

/** Headless building blocks, re-exported for consumers composing their own ColorPicker. */
export {
  renderAlphaSlider,
  renderColorArea,
  renderColorPicker,
  renderColorSlider,
  useAlphaSlider,
  useColorArea,
  useColorPicker,
  useColorPickerContextValue,
  useColorPickerContextValues,
  useColorSlider,
} from '@fluentui/react-headless-components-preview/color-picker';
export type { ColorPickerContextValue } from '@fluentui/react-headless-components-preview/color-picker';
