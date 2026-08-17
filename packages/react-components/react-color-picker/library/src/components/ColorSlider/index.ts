export { ColorSlider } from './ColorSlider';
export type {
  ColorChannel,
  ColorSliderBaseProps,
  ColorSliderBaseState,
  ColorSliderProps,
  ColorSliderSlots,
  ColorSliderState,
  SliderOnChangeData,
} from './ColorSlider.types';
export { renderColorSlider_unstable } from './renderColorSlider';
export { useColorSliderBase_unstable, useColorSlider_unstable } from './useColorSlider';
// eslint-disable-next-line @typescript-eslint/no-deprecated -- deprecated for STYLING (DECISIONS.md D16.5); re-exporting the identity constant is the point.
export { colorSliderClassNames, useColorSliderStyles_unstable } from './useColorSliderStyles.styles';
export { colorSliderCSSVars } from './ColorSlider.constants';
