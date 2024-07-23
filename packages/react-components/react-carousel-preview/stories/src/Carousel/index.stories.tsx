import { Carousel } from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselDescription.md';
import bestPracticesMd from './CarouselBestPractices.md';

export { Default } from './CarouselDefault.stories';
export { Circular } from './CarouselCircular.stories';
export { MultipleCards } from './CarouselMultipleCards.stories';
export { FreeLayout } from './CarouselFreeLayout.stories';
export { CarouselGroup } from './CarouselGroups.stories';

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
