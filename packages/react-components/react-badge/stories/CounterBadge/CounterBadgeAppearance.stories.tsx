import * as React from 'react';

import { CounterBadge } from '@fluentui/react-components';

export const Appearance = () => {
  return (
    <>
      <CounterBadge count={5} appearance="filled" />
      <CounterBadge count={5} appearance="ghost" />
    </>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: 'A counter badge can have a `ghost` or `filled` appearance. The default is `filled`.',
    },
  },
};
