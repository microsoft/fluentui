import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CounterBadge, CounterBadgeProps } from '@fluentui/react-badge';

export const Dot = (args: CounterBadgeProps) => <CounterBadge {...args} />;

Dot.args = {
  count: 0,
  dot: true,
};

Dot.parameters = {
  docs: {
    description: {
      story: 'A Badge can be represented as a dot.',
    },
  },
};
