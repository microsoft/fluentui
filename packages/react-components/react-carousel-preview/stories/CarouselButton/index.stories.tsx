import { CarouselButton } from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselButtonDescription.md';
import bestPracticesMd from './CarouselButtonBestPractices.md';

export { Default } from './CarouselButtonDefault.stories';

export default {
  title: 'Preview Components/CarouselButton',
  component: CarouselButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
