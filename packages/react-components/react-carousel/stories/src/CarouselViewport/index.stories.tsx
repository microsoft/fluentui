import { CarouselViewport } from '@fluentui/react-carousel';

import descriptionMd from './CarouselViewportDescription.md';
import bestPracticesMd from './CarouselViewportBestPractices.md';

export { Default } from './CarouselViewportDefault.stories';

export default {
  title: 'Components/CarouselViewport',
  component: CarouselViewport,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
