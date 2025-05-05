import type { Meta } from '@storybook/react';

import descriptionMd from './useTypingAnnounceDescription.md';

export { Default } from './useTypingAnnounceDefault.stories';
export { ContentEditable } from './useTypingAnnounceContentEditable.stories';
export { Filtering } from './useTypingAnnounceFiltering.stories';

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
