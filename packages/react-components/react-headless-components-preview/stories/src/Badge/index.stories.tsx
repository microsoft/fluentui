import { Badge } from '@fluentui/react-headless-components-preview';

import descriptionMd from './BadgeDescription.md';

export { Default } from './BadgeDefault.stories';

export default {
  title: 'Headless Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
