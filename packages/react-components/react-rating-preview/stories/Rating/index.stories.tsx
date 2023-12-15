import { Rating, RatingItem } from '@fluentui/react-rating-preview';

import descriptionMd from './RatingDescription.md';
import bestPracticesMd from './RatingBestPractices.md';

export { Default } from './RatingDefault.stories';
//export { Compact } from './RatingCompact.stories';
export { Max } from './RatingMax.stories';
export { Mode } from './RatingMode.stories';
export { Precision } from './RatingPrecision.stories';
//export { ReadOnly } from './RatingReadOnly.stories';
export { Size } from './RatingSize.stories';
export { Shape } from './RatingShape.stories';

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
