import * as React from 'react';
import { Button } from '@fluentui/react-button';

const meta = {
  title: 'Button',
  component: Button,
  args: {
    appearance: 'primary',
  },
};

export default meta;

export const Default = {
  render: () => <Button>Default</Button>,
};

export const WithArgs = {
  args: {
    appearance: 'outline',
  },
  render: args => <Button {...args}>With args</Button>,
};

export const ArgsOnly = {
  args: {
    children: 'Args only',
  },
  play: async () => {
    /* interaction test - must not leak into fullSource */
  },
  parameters: {
    docs: {
      description: {
        story: 'Rendered purely from args.',
      },
    },
  },
};
