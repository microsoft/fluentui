import { Rating, RatingItem } from '@fluentui/react-headless-components-preview/rating';

import descriptionMd from './RatingDescription.md';
import ratingCss from '../../../../../../bebop/components/rating.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

export { Default } from './RatingDefault.stories';

export default {
  title: 'Headless Components/Rating',
  component: Rating,
  subcomponents: { RatingItem },
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },

    ...withCssModuleSource({ name: 'rating.module.css', source: ratingCss }),
  },
};
