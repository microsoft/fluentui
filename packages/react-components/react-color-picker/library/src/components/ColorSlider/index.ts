export { ColorSlider } from './ColorSlider';
export type { ColorSliderProps, ColorSliderSlots, ColorSliderState, SliderOnChangeData } from './ColorSlider.types';
export { renderColorSlider_unstable } from './renderColorSlider';
export { useColorSlider_unstable } from './useColorSlider';
export {
  colorSliderCSSVars,
  colorSliderClassNames, // eslint-disable-line @typescript-eslint/no-deprecated -- deprecated for STYLING (DECISIONS.md D16.5); re-exporting the identity constant is the point.
  useColorSliderStyles_unstable,
} from './useColorSliderStyles.styles';
