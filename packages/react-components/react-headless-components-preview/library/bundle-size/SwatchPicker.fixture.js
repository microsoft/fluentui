// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  ColorSwatch,
  EmptySwatch,
  ImageSwatch,
  SwatchPicker,
  SwatchPickerRow,
  renderColorSwatch,
  renderEmptySwatch,
  renderImageSwatch,
  renderSwatchPicker,
  renderSwatchPickerRow,
  useColorSwatch,
  useEmptySwatch,
  useImageSwatch,
  useSwatchPicker,
  useSwatchPickerContextValue,
  useSwatchPickerContextValues,
  useSwatchPickerRow,
} from '@fluentui/react-headless-components-preview/swatch-picker';

console.log(
  ColorSwatch,
  EmptySwatch,
  ImageSwatch,
  SwatchPicker,
  SwatchPickerRow,
  renderColorSwatch,
  renderEmptySwatch,
  renderImageSwatch,
  renderSwatchPicker,
  renderSwatchPickerRow,
  useColorSwatch,
  useEmptySwatch,
  useImageSwatch,
  useSwatchPicker,
  useSwatchPickerContextValue,
  useSwatchPickerContextValues,
  useSwatchPickerRow,
);

export default {
  name: '@fluentui/react-headless-components-preview/swatch-picker',
};
