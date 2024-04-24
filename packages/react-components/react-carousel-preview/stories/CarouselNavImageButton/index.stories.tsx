import { CarouselNavImageButton } from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselNavImageButtonDescription.md';
import bestPracticesMd from './CarouselNavImageButtonBestPractices.md';

export { Default } from './CarouselNavImageButtonDefault.stories';

export default {
  title: 'Preview Components/CarouselNavImageButton',
  component: CarouselNavImageButton,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
