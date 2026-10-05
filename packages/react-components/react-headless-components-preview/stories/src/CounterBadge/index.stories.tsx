import { CounterBadge } from '@fluentui/react-headless-components-preview/badge';

import descriptionMd from './CounterBadgeDescription.md';
export { Default } from './CounterBadgeDefault.stories';

import './counter-badge.module.css';

export default {
  title: 'Components/Badge/CounterBadge',
  component: CounterBadge,
  parameters: {
    docs: {
      description: {
        component: descriptionMd,
      },
    },
  },
};
