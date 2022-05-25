import * as React from 'react';
import { Label } from '../index';

export const Strong = () => <Label strong>Strong label</Label>;

Strong.parameters = {
  docs: {
    description: {
      story: 'A Label with a strong font weight.',
    },
  },
};
