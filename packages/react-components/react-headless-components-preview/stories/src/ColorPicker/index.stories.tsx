import {
  AlphaSlider,
  ColorArea,
  ColorPicker,
  ColorSlider,
} from '@fluentui/react-headless-components-preview/color-picker';

import descriptionMd from './ColorPickerDescription.md';
import './color-picker.module.css';

export { ColorPickerDefault } from './ColorPickerDefault.stories';
export { ColorAreaDefault } from './ColorAreaDefault.stories';
export { ColorSliderDefault } from './ColorSliderDefault.stories';
export { AlphaSliderDefault } from './AlphaSliderDefault.stories';

export default {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  subcomponents: {
    AlphaSlider,
    ColorArea,
    ColorSlider,
  },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
