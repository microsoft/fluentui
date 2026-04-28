import { RatingDisplay } from '@fluentui/react-headless-components-preview/rating-display';

import descriptionMd from './RatingDisplayDescription.md';
import ratingDisplayCss from './rating-display.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './RatingDisplayDefault.stories';
export { Compact } from './RatingDisplayCompact.stories';

export default {
  title: 'Headless Components/RatingDisplay',
  component: RatingDisplay,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource({ name: 'rating-display.module.css', source: ratingDisplayCss }),
  },
};
