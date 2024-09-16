import type { Meta } from '@storybook/react';
import descriptionMd from './UseAnnounceDescription.md';

export { Default } from './UseAnnounceDefault.stories';

export default {
  title: 'Utilities/ARIA live/useAnnounce',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} satisfies Meta;
