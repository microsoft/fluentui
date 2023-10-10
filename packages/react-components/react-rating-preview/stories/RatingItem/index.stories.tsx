import { RatingItem } from '@fluentui/react-rating-preview';

import descriptionMd from './RatingItemDescription.md';
import bestPracticesMd from './RatingItemBestPractices.md';

export { Default } from './RatingItemDefault.stories';

export default {
  title: 'Preview Components/RatingItem',
  component: RatingItem,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
