import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { CounterBadge } from '@fluentui/react-components';

export const Shapes = (): JSXElement => {
  return (
    <>
      <CounterBadge count={5} shape="circular" />
      <CounterBadge count={5} shape="rounded" />
    </>
  );
};

Shapes.parameters = {
  docs: {
    description: {
      story: 'A counter badge can have a `rounded` or `circular` shape. The default is `circular`.',
    },
  },
};
