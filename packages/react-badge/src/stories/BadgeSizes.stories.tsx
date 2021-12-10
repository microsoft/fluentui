import * as React from 'react';

import { Badge } from '../index';

export const Sizes = () => {
  return (
    <>
      <Badge size="tiny" />
      <Badge size="extra-small" />
      <Badge size="small" />
      <Badge size="medium" />
      <Badge size="large" />
      <Badge size="extra-large" />
    </>
  );
};

Sizes.parameters = {
  docs: {
    description: {
      story:
        'A badge supports `tiny`, `extra-small`, `small`, `medium`, `large`, and `extra-large` sizes.' +
        ' The default is `medium`.',
    },
  },
};
