import * as React from 'react';
import { Label } from '@fluentui/react-modern-components-preview/label';

export const Weight = (): React.ReactNode => <Label weight="semibold">Strong label</Label>;

Weight.parameters = {
  docs: {
    description: {
      story: 'A Label with a semibold font weight.',
    },
  },
};
