import * as React from 'react';

import { CounterBadge, CounterBadgeProps } from '@fluentui/react-badge';

export const Default = (args: CounterBadgeProps) => <CounterBadge {...args} />;

Default.args = {
  count: 5,
};
