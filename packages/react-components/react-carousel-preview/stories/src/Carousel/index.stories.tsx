import { Carousel } from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselDescription.md';
import bestPracticesMd from './CarouselBestPractices.md';

export { Default } from './CarouselDefault.stories';
export { Responsive } from './CarouselResponsive';
export { Controlled } from './CarouselControlled.stories';
export { ImageSlideshow } from './CarouselImageBox.stories';
export { ActionCards } from './CarouselActionCards.stories';

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
