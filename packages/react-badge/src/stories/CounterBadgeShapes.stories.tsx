import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CounterBadge, CounterBadgeProps } from '@fluentui/react-badge';

export const Shapes = (args: CounterBadgeProps) => {
  return (
    <>
      <CounterBadge {...args} shape="rounded" />
      <CounterBadge {...args} shape="circular" />
    </>
  );
};

Shapes.args = {
  count: 5,
};

Shapes.parameters = {
  docs: {
    description: {
      story: 'A CounterBadge can be represented in the `rounded` and `circular` shapes.',
    },
  },
};
