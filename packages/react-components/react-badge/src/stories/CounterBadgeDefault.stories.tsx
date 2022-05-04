import * as React from 'react';

import { CounterBadge, CounterBadgeProps } from '../index';

export const Default = (args: CounterBadgeProps) => <CounterBadge {...args} />;
Default.args = {
  count: 5,
};
