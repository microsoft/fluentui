import type { Meta } from '@storybook/react';

import description from './MotionDescription.md';

export { DisableMotion } from './DisableMotion.stories';
export { CustomMotion } from './CustomMotion.stories';

export default {
  title: 'Motion/Motion Slot',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: description,
      },
      hideArgsTable: true,
      skipPrimaryStory: true,
    },
  },
} satisfies Meta;
