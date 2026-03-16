import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Checkbox } from '@fluentui/react-components';

export const LabelBefore = (): JSXElement => <Checkbox labelPosition="before" label="Label before" />;
LabelBefore.parameters = {
  docs: {
    description: {
      story: 'The label can be placed before the checkbox.',
    },
  },
};
