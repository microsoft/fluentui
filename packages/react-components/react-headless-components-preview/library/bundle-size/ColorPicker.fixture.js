// Named imports only - a namespace import keeps every export name as a string property in the minified output,
// which no consumer ships, and inflates the measured size.
import {
  AlphaSlider,
  ColorArea,
  ColorPicker,
  ColorSlider,
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

console.log(
  AlphaSlider,
  ColorArea,
  ColorPicker,
  ColorSlider,
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
);

export default {
  name: '@fluentui/react-headless-components-preview/color-picker',
};
