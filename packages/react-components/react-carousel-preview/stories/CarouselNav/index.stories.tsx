import { CarouselNav } from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselNavDescription.md';
import bestPracticesMd from './CarouselNavBestPractices.md';

export { Default } from './CarouselNavDefault.stories';

export default {
  title: 'Preview Components/CarouselNav',
  component: CarouselNav,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
