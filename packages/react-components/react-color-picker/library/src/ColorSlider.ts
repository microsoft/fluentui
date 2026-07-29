export type {
  ColorSliderProps,
  ColorSliderSlots,
  ColorSliderState,
  SliderOnChangeData,
} from './components/ColorSlider/index';
export {
  ColorSlider,
  colorSliderCSSVars,
  colorSliderClassNames, // eslint-disable-line @typescript-eslint/no-deprecated -- deprecated for STYLING (DECISIONS.md D16.5); re-exporting the identity constant is the point.
  renderColorSlider_unstable,
  useColorSliderStyles_unstable,
  useColorSlider_unstable,
} from './components/ColorSlider/index';
