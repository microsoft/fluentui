import { Rating, RatingItem } from '@fluentui/react-rating-preview';

import descriptionMd from './RatingDescription.md';
import bestPracticesMd from './RatingBestPractices.md';

export { Default } from './RatingDefault.stories';

export default {
  title: 'Preview Components/Rating',
  component: Rating,
  subcomponents: {
    RatingItem,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
