import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CounterBadge, CounterBadgeProps } from '@fluentui/react-badge';

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
      story: 'A CounterBadge supports `tiny`, `extra-small`, `small`, `medium`, `large`, and `extra-large` sizes.',
    },
  },
};
