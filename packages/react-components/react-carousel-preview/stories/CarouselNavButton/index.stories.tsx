import { CarouselNavButton } from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselNavButtonDescription.md';
import bestPracticesMd from './CarouselNavButtonBestPractices.md';

export { Default } from './CarouselNavButtonDefault.stories';

export default {
  title: 'Preview Components/CarouselNavButton',
  component: CarouselNavButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
