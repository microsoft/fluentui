import { CarouselAutoplayButton } from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselAutoplayButtonDescription.md';
import bestPracticesMd from './CarouselAutoplayButtonBestPractices.md';

export { Default } from './CarouselAutoplayButtonDefault.stories';

export default {
  title: 'Preview Components/CarouselAutoplayButton',
  component: CarouselAutoplayButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
