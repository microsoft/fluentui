import { CarouselFooter } from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselFooterDescription.md';
import bestPracticesMd from './CarouselFooterBestPractices.md';

export { Default } from './CarouselFooterDefault.stories';

export default {
  title: 'Preview Components/CarouselFooter',
  component: CarouselFooter,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
