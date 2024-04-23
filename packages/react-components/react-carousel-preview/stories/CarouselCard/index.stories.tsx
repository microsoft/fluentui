import { CarouselCard } from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselCardDescription.md';
import bestPracticesMd from './CarouselCardBestPractices.md';

export { Default } from './CarouselCardDefault.stories';

export default {
  title: 'Preview Components/CarouselCard',
  component: CarouselCard,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
