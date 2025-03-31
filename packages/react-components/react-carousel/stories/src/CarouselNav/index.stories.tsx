import { CarouselNav } from '@fluentui/react-components';

import descriptionMd from './CarouselNavDescription.md';
import bestPracticesMd from './CarouselNavBestPractices.md';

export { Default } from './CarouselNavDefault.stories';

export default {
  title: 'Components/Carousel/CarouselNav',
  component: CarouselNav,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
