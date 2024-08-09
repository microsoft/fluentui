import { HueSlider } from '@fluentui/react-color-picker-preview';

import descriptionMd from './HueSliderDescription.md';
import bestPracticesMd from './HueSliderBestPractices.md';

export { Default } from './HueSliderDefault.stories';

export default {
  title: 'Preview Components/HueSlider',
  component: HueSlider,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
