import { AriaLiveAnnouncer } from '@fluentui/react-components';
import type { Meta } from '@storybook/react';

import descriptionMd from './AriaLiveAnnouncerDescription.md';

export { Default } from './AriaLiveAnnouncerDefault.stories';

export default {
  title: 'Utilities/ARIA live/AriaLiveAnnouncer',
  component: AriaLiveAnnouncer,
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} as Meta;
