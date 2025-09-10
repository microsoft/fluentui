import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';

export const Large = (): JSXElement => <Checkbox size="large" label="Large" />;
Large.parameters = {
  docs: {
    description: {
      story: 'A checkbox can be large in size.',
    },
  },
};
