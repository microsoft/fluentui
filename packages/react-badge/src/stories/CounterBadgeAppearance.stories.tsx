import * as React from 'react';

import { CounterBadge, CounterBadgeProps } from '../index';

export const Appearance = (args: CounterBadgeProps) => {
  return (
    <>
      <CounterBadge {...args} appearance="filled" />
      <CounterBadge {...args} appearance="ghost" />
    </>
  );
};

Appearance.args = {
  count: 5,
};

Appearance.parameters = {
  docs: {
    description: {
      story: 'A counter badge can have a `ghost` or `filled` appearance. The default is `filled`.',
    },
  },
};
