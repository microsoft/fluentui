import { Badge } from '@fluentui/react-headless-components-preview/badge';

import descriptionMd from './BadgeDescription.md';
import badgeCss from './badge.module.css?raw';
import { withCssModuleSource } from '../_helpers/withCssModuleSource';

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

    ...withCssModuleSource({ name: 'badge.module.css', source: badgeCss }),
  },
};
