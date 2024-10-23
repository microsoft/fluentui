import type { Meta } from '@storybook/react';
import PresenceGroupDescription from './PresenceGroupDescription.md';

export { PresenceGroupDefault as Default } from './PresenceGroupDefault.stories';

export default {
  title: 'Motion/APIs/PresenceGroup',
  parameters: {
    docs: {
      description: {
        component: PresenceGroupDescription,
      },
      hideArgsTable: true,
    },
  },
} satisfies Meta;
