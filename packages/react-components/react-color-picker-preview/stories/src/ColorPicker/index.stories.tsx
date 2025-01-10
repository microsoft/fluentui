import { ColorPicker, ColorArea, ColorSlider, AlphaSlider } from '@fluentui/react-color-picker-preview';

import descriptionMd from './ColorPickerDescription.md';
import bestPracticesMd from './ColorPickerBestPractices.md';

export { Default } from './ColorPickerDefault.stories';
export { ColorPickerShape } from './ColorPickerShape.stories';
export { ColorAreaExample } from './ColorAreaDefault.stories';
export { ColorSliderExample } from './ColorSliderDefault.stories';
export { AlphaSliderExample } from './AlphaSliderDefault.stories';
export { ColorAndSwatchPickerExample } from './ColorAndSwatchPicker.stories';
export { ColorPickerPopup } from './ColorPickerPopup.stories';

export default {
  title: 'Preview Components/ColorPicker',
  component: ColorPicker,
  subcomponents: {
    ColorArea,
    ColorSlider,
    AlphaSlider,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
