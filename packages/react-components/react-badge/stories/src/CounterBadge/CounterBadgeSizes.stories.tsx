import * as React from 'react';

import { CounterBadge } from '@fluentui/react-components';

export const Sizes = () => {
  return (
    <>
      <CounterBadge count={5} size="tiny" />
      <CounterBadge count={5} size="extra-small" />
      <CounterBadge count={5} size="small" />
      <CounterBadge count={5} size="medium" />
      <CounterBadge count={5} size="large" />
      <CounterBadge count={5} size="extra-large" />
    </>
  );
};

Sizes.parameters = {
  docs: {
    description: {
      story:
        'A counter badge supports `tiny`, `extra-small`, `small`, `medium`, `large`, and `extra-large` sizes.' +
        ' The default is `medium`.',
    },
  },
};
