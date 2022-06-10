import * as React from 'react';
import { Label } from '../index';

export const Weight = () => <Label weight="semibold">Strong label</Label>;

Weight.parameters = {
  docs: {
    description: {
      story: 'A Label with a semibold font weight.',
    },
  },
};
