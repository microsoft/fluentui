import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import { Badge } from '@fluentui/react-components';

export const Shapes = (): JSXElement => {
  return (
    <>
      <Badge shape="square" />
      <Badge shape="rounded" />
      <Badge shape="circular" />
    </>
  );
};

Shapes.parameters = {
  docs: {
    description: {
      story: 'A badge can have `square`, `rounded` or `circular` shape. The default is `circular`.',
    },
  },
};
