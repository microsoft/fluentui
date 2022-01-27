import * as React from 'react';

import { Badge } from '../index';

export const Appearance = () => {
  return (
    <>
      <Badge appearance="filled">999+</Badge>
      <Badge appearance="ghost">999+</Badge>
      <Badge appearance="outline">999+</Badge>
      <Badge appearance="tint">999+</Badge>
    </>
  );
};

Appearance.parameters = {
  docs: {
    description: {
      story: 'A badge can have a `ghost`, `filled`, `outline`, or `tint` appearance. The default is `filled`.',
    },
  },
};
