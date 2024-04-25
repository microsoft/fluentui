import { Carousel } from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselDescription.md';
import bestPracticesMd from './CarouselBestPractices.md';

export { Default } from './CarouselDefault.stories';

export default {
  title: 'Preview Components/Carousel',
  component: Carousel,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
