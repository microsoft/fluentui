import * as React from 'react';

import { Checkbox } from '@fluentui/react-modern-components-preview/checkbox';

export const LabelBefore = (): React.ReactNode => <Checkbox labelPosition="before" label="Label before" />;
LabelBefore.parameters = {
  docs: {
    description: {
      story: 'The label can be placed before the checkbox.',
    },
  },
};
