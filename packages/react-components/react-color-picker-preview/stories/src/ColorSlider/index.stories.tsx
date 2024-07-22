import { ColorSlider } from '@fluentui/react-color-picker-preview';

import descriptionMd from './ColorSliderDescription.md';
import bestPracticesMd from './ColorSliderBestPractices.md';

export { Default } from './ColorSliderDefault.stories';
export { AlphaSlider } from './AlphaSlider.stories';

export default {
  title: 'Preview Components/ColorSlider',
  component: ColorSlider,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
