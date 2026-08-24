export { SwatchPicker, swatchPickerClassNames, useSwatchPickerStyles } from './components/SwatchPicker';
export type {
  SwatchPickerProps,
  SwatchPickerShape,
  SwatchPickerSize,
  SwatchPickerSlots,
  SwatchPickerSpacing,
  SwatchPickerState,
} from './components/SwatchPicker';

/** Headless building blocks, re-exported for consumers composing their own SwatchPicker. */
export {
  renderSwatchPicker,
  useSwatchPicker,
  useSwatchPickerContextValue,
  useSwatchPickerContextValues,
} from '@fluentui/react-headless-components-preview/swatch-picker';
