import {
  AlphaSlider,
  ColorArea,
  ColorPicker,
  ColorSlider,
} from '@fluentui/react-modern-components-preview/color-picker';

import descriptionMd from './ColorPickerDescription.md';
import bestPracticesMd from './ColorPickerBestPractices.md';

export { Default } from './ColorPickerDefault.stories';
export { ColorPickerShape } from './ColorPickerShape.stories';
export { ColorAreaDefault } from './ColorAreaDefault.stories';
export { ColorSliderDefault } from './ColorSliderDefault.stories';
export { ColorSliderChannels } from './ColorSliderChannels.stories';
export { AlphaSliderDefault } from './AlphaSliderDefault.stories';
export { ColorAndSwatchPicker } from './ColorAndSwatchPicker.stories';
export { ColorPickerPopup } from './ColorPickerPopup.stories';

export default {
  title: 'Components/ColorPicker/ColorPicker',
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
