import { RatingDisplay } from '@fluentui/react-rating-preview';

import descriptionMd from './RatingDisplayDescription.md';
import bestPracticesMd from './RatingDisplayBestPractices.md';

export { Default } from './RatingDisplayDefault.stories';
export { Color } from './RatingDisplayColor.stories';
export { Max } from './RatingDisplayMax.stories';
export { Step } from './RatingDisplayStep.stories';
export { Size } from './RatingDisplaySize.stories';
export { Shape } from './RatingDisplayShape.stories';

export default {
  title: 'Preview Components/RatingDisplay',
  component: RatingDisplay,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
