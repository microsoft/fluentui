import { RatingDisplay } from '@fluentui/react-headless-components-preview/rating-display';

import descriptionMd from './RatingDisplayDescription.md';
export { Default } from './RatingDisplayDefault.stories';
export { Compact } from './RatingDisplayCompact.stories';

export default {
  title: 'Components/RatingDisplay',
  component: RatingDisplay,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
