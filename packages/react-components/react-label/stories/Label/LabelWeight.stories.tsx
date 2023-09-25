import * as React from 'react';
import { Label } from '@fluentui/react-components';

export const Weight = () => <Label weight="semibold">Strong label</Label>;

Weight.parameters = {
  docs: {
    description: {
      story: 'A Label with a semibold font weight.',
    },
  },
};
