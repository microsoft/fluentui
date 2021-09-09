import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CounterBadge, CounterBadgeProps } from '@fluentui/react-badge';

export const Sizes = (args: CounterBadgeProps) => {
  return (
    <>
      <CounterBadge {...args} size="smallest" />
      <CounterBadge {...args} size="smaller" />
      <CounterBadge {...args} size="small" />
      <CounterBadge {...args} size="medium" />
      <CounterBadge {...args} size="large" />
      <CounterBadge {...args} size="larger" />
      <CounterBadge {...args} size="largest" />
    </>
  );
};

Sizes.args = {
  count: 5,
};

Sizes.parameters = {
  docs: {
    description: {
      story: 'A CounterBadge supports `smallest`, `smaller`, `small`, `medium`, `large`, `larger`, and `largest` sized',
    },
  },
};
