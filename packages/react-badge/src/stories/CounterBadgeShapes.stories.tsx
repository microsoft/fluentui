import * as React from 'react';

import { CounterBadge, CounterBadgeProps } from '../index';

export const Shapes = (args: CounterBadgeProps) => {
  return (
    <>
      <CounterBadge {...args} shape="circular" />
      <CounterBadge {...args} shape="rounded" />
    </>
  );
};

Shapes.args = {
  count: 5,
};

Shapes.parameters = {
  docs: {
    description: {
      story: 'A counter badge can have a `rounded` or `circular` shape. The default is `circular`.',
    },
  },
};
