import * as React from 'react';

import { CounterBadge, CounterBadgeProps } from '../index';

export const Color = (args: CounterBadgeProps) => {
  return (
    <>
      <CounterBadge appearance="filled" color="brand" {...args} />
      <CounterBadge appearance="filled" color="danger" {...args} />
      <CounterBadge appearance="filled" color="important" {...args} />
      <CounterBadge appearance="filled" color="informative" {...args} />
    </>
  );
};

Color.args = {
  count: 5,
};

Color.parameters = {
  docs: {
    description: {
      story:
        'A counter badge can be different colors.' +
        ' The available colors are `brand`, `danger`, `important`, `informative`, ' +
        '`severe`, `severe`, `success` or `warning`.' +
        ' The default is `brand`.',
    },
  },
};
