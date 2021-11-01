import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CounterBadge, CounterBadgeProps } from '@fluentui/react-badge';

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
      story: 'A CounterBadge can have appearance as `ghost`, `filled`',
    },
  },
};
