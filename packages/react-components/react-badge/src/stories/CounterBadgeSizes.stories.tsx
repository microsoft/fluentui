import * as React from 'react';

import { CounterBadge, CounterBadgeProps } from '../index';

export const Sizes = (args: CounterBadgeProps) => {
  return (
    <>
      <CounterBadge {...args} size="tiny" />
      <CounterBadge {...args} size="extra-small" />
      <CounterBadge {...args} size="small" />
      <CounterBadge {...args} size="medium" />
      <CounterBadge {...args} size="large" />
      <CounterBadge {...args} size="extra-large" />
    </>
  );
};

Sizes.args = {
  count: 5,
};

Sizes.parameters = {
  docs: {
    description: {
      story:
        'A counter badge supports `tiny`, `extra-small`, `small`, `medium`, `large`, and `extra-large` sizes.' +
        ' The default is `medium`.',
    },
  },
};
