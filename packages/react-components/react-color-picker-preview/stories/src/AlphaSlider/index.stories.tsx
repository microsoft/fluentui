import { AlphaSlider } from '@fluentui/react-color-picker-preview';

import descriptionMd from './AlphaSliderDescription.md';
import bestPracticesMd from './AlphaSliderBestPractices.md';

export { Default } from './AlphaSliderDefault.stories';

export default {
  title: 'Preview Components/AlphaSlider',
  component: AlphaSlider,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
