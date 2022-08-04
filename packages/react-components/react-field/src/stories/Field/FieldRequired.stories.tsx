import * as React from 'react';
import { Input } from '@fluentui/react-components';
import { Field } from '@fluentui/react-field';

export const Required = () => (
  <Field label="Required input" required>
    <Input />
  </Field>
);

Required.parameters = {
  docs: {
    description: {
      story:
        'When a field is marked as `required`, the label has a red asterisk, ' +
        'and the input gets the required property for accessiblity tools.',
    },
  },
};
