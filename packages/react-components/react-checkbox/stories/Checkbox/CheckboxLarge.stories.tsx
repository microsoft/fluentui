import * as React from 'react';
import { Checkbox } from '@fluentui/react-components';

export const Large = () => <Checkbox size="large" label="Large" />;
Large.parameters = {
  docs: {
    description: {
      story: 'A checkbox can be large in size.',
    },
  },
};
