import { TeachingPopoverCarousel } from '@fluentui/react-teaching-popover-preview';

import descriptionMd from './TeachingPopoverCarouselDescription.md';
import bestPracticesMd from './TeachingPopoverCarouselBestPractices.md';

export { Default } from './TeachingPopoverCarouselDefault.stories';

export default {
  title: 'Preview Components/TeachingPopoverCarousel',
  component: TeachingPopoverCarousel,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
