import * as React from 'react';
// https://github.com/microsoft/fluentui/pull/18695#issuecomment-868432982
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CounterBadge, CounterBadgeProps } from '@fluentui/react-badge';

export const Color = (args: CounterBadgeProps) => {
  return (
    <>
      <CounterBadge appearance="filled" color="brand" {...args} />
      <CounterBadge appearance="filled" color="danger" {...args} />
      <CounterBadge appearance="filled" color="important" {...args} />
      <CounterBadge appearance="filled" color="informative" {...args} />
      <CounterBadge appearance="filled" color="severe" {...args} />
      <CounterBadge appearance="filled" color="subtle" {...args} />
      <CounterBadge appearance="filled" color="success" {...args} />
      <CounterBadge appearance="filled" color="warning" {...args} />
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
