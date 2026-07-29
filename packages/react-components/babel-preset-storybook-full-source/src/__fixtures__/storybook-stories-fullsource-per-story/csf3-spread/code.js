import * as React from 'react';
import { Button } from '@fluentui/react-button';

const meta = {
  title: 'Button',
  component: Button,
};

export default meta;

export const Base = {
  render: () => <Button appearance="primary">Base</Button>,
};

export const Derived = {
  ...Base,
  parameters: {
    docs: {
      description: {
        story: 'Spreads Base.',
      },
    },
  },
};
