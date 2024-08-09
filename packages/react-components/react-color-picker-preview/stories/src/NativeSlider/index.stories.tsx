import { NativeSlider } from '@fluentui/react-color-picker-preview';

import descriptionMd from './NativeSliderDescription.md';
import bestPracticesMd from './NativeSliderBestPractices.md';

export { Default } from './NativeSliderDefault.stories';

export default {
  title: 'Preview Components/NativeSlider',
  component: NativeSlider,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
