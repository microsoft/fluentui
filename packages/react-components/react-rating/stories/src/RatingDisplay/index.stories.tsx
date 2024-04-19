import { RatingDisplay } from '@fluentui/react-components';

import descriptionMd from './RatingDisplayDescription.md';
import bestPracticesMd from './RatingDisplayBestPractices.md';

export { Default } from './RatingDisplayDefault.stories';
export { Value } from './RatingDisplayValue.stories';
export { Count } from './RatingDisplayCount.stories';
export { Compact } from './RatingDisplayCompact.stories';
export { Max } from './RatingDisplayMax.stories';
export { Size } from './RatingDisplaySize.stories';
export { Color } from './RatingDisplayColor.stories';
export { Shape } from './RatingDisplayShape.stories';

export default {
  title: 'Components/RatingDisplay',
  component: RatingDisplay,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, bestPracticesMd].join('\n'),
      },
    },
  },
};
