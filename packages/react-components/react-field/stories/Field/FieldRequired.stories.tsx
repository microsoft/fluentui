import * as React from 'react';

import { Input } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';

export const Required = () => (
  <Field label="Required field" required>
    <Input />
  </Field>
);

Required.parameters = {
  docs: {
    description: {
      story:
        'When a field is marked as `required`, the label has a red asterisk, ' +
        'and the input gets the `aria-required` property for accessiblity tools.',
    },
  },
};
