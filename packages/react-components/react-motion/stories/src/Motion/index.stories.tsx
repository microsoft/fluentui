import type { Meta } from '@storybook/react-webpack5';

import description from './MotionDescription.md';

export { DisableMotion } from './DisableMotion.stories';
export { CustomMotion } from './CustomMotion.stories';
export { DirectParams } from './DirectParams.stories';

export default {
  title: 'Motion/Using motion slots',
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
