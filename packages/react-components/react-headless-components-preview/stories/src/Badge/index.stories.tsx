import { Badge } from '@fluentui/react-headless-components-preview/badge';

import descriptionMd from './BadgeDescription.md';
export { Default } from './BadgeDefault.stories';

import './badge.module.css';

export default {
  title: 'Components/Badge/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
