import * as React from 'react';
import { Checkbox } from './index';

export const LabelBefore = () => <Checkbox labelPosition="before" label="Label before" />;
LabelBefore.parameters = {
  docs: {
    description: {
      story: 'The label can be placed before the checkbox.',
    },
  },
};
