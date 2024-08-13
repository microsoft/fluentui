import * as React from 'react';

import { CounterBadge } from '@fluentui/react-components';
import type { CounterBadgeProps } from '@fluentui/react-components';

export const Default = (args: CounterBadgeProps) => <CounterBadge {...args} />;

Default.args = {
  count: 5,
};
