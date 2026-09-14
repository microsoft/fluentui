import { PresenceBadge } from '@fluentui/react-headless-components-preview/badge';

import descriptionMd from './PresenceBadgeDescription.md';
export { Default } from './PresenceBadgeDefault.stories';
export { OutOfOffice } from './PresenceBadgeOutOfOffice.stories';

import './presence-badge.module.css';

export default {
  title: 'Components/Badge/PresenceBadge',
  component: PresenceBadge,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
