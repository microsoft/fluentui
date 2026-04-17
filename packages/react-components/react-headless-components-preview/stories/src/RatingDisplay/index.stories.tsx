import { RatingDisplay } from '@fluentui/react-headless-components-preview';

import descriptionMd from './RatingDisplayDescription.md';

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
  },
};
