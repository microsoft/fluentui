import { Rating, RatingItem } from '@fluentui/react-components';

import descriptionMd from './RatingDescription.md';
import bestPracticesMd from './RatingBestPractices.md';

export { Default } from './RatingDefault.stories';
export { ControlledValue } from './RatingControlledValue.stories';
export { Step } from './RatingStep.stories';
export { Max } from './RatingMax.stories';
export { Size } from './RatingSize.stories';
export { Color } from './RatingColor.stories';
export { Shape } from './RatingShape.stories';

export default {
  title: 'Components/Rating',
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
