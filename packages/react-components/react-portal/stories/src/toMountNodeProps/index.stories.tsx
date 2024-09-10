import type { Meta } from '@storybook/react';
import descriptionMd from './toMountNodePropsDescription.md';

export { Default } from './Default.stories';

export default {
  title: 'Components/Portal/toMountNodeProps',
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
} satisfies Meta;
