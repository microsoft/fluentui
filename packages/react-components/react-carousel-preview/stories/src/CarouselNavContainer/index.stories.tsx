import { CarouselNavContainer } from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselNavContainerDescription.md';
import bestPracticesMd from './CarouselNavContainerBestPractices.md';

export { Default } from './CarouselNavContainerDefault.stories';

export default {
  title: 'Preview Components/CarouselNavContainer',
  component: CarouselNavContainer,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
