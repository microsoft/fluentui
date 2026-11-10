import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { CounterBadge } from '@fluentui/react-components';
import type { CounterBadgeProps } from '@fluentui/react-components';

export const Default = (args: CounterBadgeProps): JSXElement => <CounterBadge {...args} />;

Default.args = {
  count: 5,
};
