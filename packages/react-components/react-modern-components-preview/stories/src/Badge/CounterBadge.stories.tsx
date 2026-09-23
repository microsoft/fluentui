import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { CounterBadge } from '@fluentui/react-modern-components-preview/badge';

const meta = {
  title: 'Components/Badge/CounterBadge',
  component: CounterBadge,
  args: {
    count: 5,
  },
} satisfies Meta<typeof CounterBadge>;

export default meta;

export const Default: StoryObj<typeof meta> = {
  render: args => <CounterBadge {...args} />,
};
