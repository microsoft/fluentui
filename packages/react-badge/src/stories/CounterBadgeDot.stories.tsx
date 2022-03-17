import * as React from 'react';

import { CounterBadge, CounterBadgeProps } from '../index';

export const Dot = (args: CounterBadgeProps) => <CounterBadge {...args} />;

Dot.args = {
  count: 0,
  dot: true,
};

Dot.parameters = {
  docs: {
    description: {
      story: 'A counter badge can display a small dot.',
    },
  },
};
