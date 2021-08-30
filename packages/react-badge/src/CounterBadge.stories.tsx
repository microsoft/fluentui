import * as React from 'react';
import { CounterBadgeProps } from './components/CounterBadge/CounterBadge.types';
import { CounterBadge } from './index';

const Template = (args: CounterBadgeProps) => <CounterBadge {...args} />;
Template.args = {
  count: 5,
} as CounterBadgeProps;

export const Default = Template.bind({});
Default.args = {
  ...Template.args,
};

export const Dot = Template.bind({});
Dot.args = {
  ...Template.args,
  dot: true,
};

export default {
  title: 'Components/Badge/Counter Badge',
  component: CounterBadge,
  parameters: {
    docs: {
      description: {
        component: 'Counter Badge represents a count or amount of information.',
      },
    },
  },
};
