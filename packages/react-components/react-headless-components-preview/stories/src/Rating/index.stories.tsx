import { Rating, RatingItem } from '@fluentui/react-headless-components-preview';

import descriptionMd from './RatingDescription.md';

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
  },
};
