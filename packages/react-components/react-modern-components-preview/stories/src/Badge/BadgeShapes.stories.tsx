import * as React from 'react';

import { Badge } from '@fluentui/react-modern-components-preview/badge';

export const Shapes = (): React.ReactNode => {
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
