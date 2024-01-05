import { ImageSwatch } from '@fluentui/react-swatch-picker-preview';

import descriptionMd from './ImageSwatchDescription.md';
import bestPracticesMd from './ImageSwatchBestPractices.md';

//export { Default } from './ImageSwatchDefault.stories';

export default {
  title: 'Preview Components/ImageSwatch',
  component: ImageSwatch,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
