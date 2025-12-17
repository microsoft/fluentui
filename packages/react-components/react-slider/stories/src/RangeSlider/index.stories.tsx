import { RangeSlider } from '@fluentui/react-components';

import descriptionMd from './RangeSliderDescription.md';
import bestPracticesMd from './RangeSliderBestPractices.md';

export { Default } from './RangeSliderDefault.stories';

export default {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
