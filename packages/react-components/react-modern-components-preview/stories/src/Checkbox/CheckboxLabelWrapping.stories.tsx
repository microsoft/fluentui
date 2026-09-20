import * as React from 'react';

import { Checkbox } from '@fluentui/react-modern-components-preview/checkbox';

export const LabelWrapping = (): React.ReactNode => (
  <Checkbox
    style={{ maxWidth: '400px' }}
    label="Here is an example of a checkbox with a long label and it starts to wrap to a second line"
  />
);
LabelWrapping.parameters = {
  docs: {
    description: {
      story:
        'The label will wrap if it is wider than the available space. The checkbox indicator will stay aligned ' +
        'to the first line of text.',
    },
  },
};
