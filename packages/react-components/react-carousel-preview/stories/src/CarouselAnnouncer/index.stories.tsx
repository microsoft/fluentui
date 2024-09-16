import { CarouselAnnouncer } from '@fluentui/react-carousel-preview';

import descriptionMd from './CarouselAnnouncerDescription.md';
import bestPracticesMd from './CarouselAnnouncerBestPractices.md';

export { Default } from './CarouselAnnouncerDefault.stories';

export default {
  title: 'Preview Components/CarouselAnnouncer',
  component: CarouselAnnouncer,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
