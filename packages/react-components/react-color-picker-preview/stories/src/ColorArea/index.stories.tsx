import { ColorArea } from '@fluentui/react-color-picker-preview';

import descriptionMd from './ColorAreaDescription.md';
import bestPracticesMd from './ColorAreaBestPractices.md';

export { Default } from './ColorAreaDefault.stories';

export default {
  title: 'Preview Components/ColorArea',
  component: ColorArea,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
