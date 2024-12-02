import { ColorPicker } from '@fluentui/react-color-picker-preview';

import descriptionMd from './ColorPickerDescription.md';
import bestPracticesMd from './ColorPickerBestPractices.md';

export { Default } from './ColorPickerDefault.stories';
export { ColorAreaExample } from './ColorAreaDefault.stories';
export { ColorSliderExample } from './ColorSliderDefault.stories';
export { AlphaSliderExample } from './AlphaSliderDefault.stories';

export default {
  title: 'Preview Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
