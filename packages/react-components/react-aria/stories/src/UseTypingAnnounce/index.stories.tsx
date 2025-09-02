import type { Meta } from '@storybook/react';

import descriptionMd from './UseTypingAnnounceDescription.md';

export { Default } from './UseTypingAnnounceDefault.stories';
export { ContentEditable } from './UseTypingAnnounceContentEditable.stories';
export { Filtering } from './UseTypingAnnounceFiltering.stories';

export default {
  title: 'Utilities/ARIA live/useTypingAnnounce',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} as Meta;
