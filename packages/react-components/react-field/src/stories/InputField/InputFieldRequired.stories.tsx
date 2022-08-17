import * as React from 'react';
import { InputField } from '@fluentui/react-field';

export const Required = () => <InputField label="Required field" required />;

Required.parameters = {
  docs: {
    description: {
      story:
        'When a field is marked as `required`, the label has a red asterisk, ' +
        'and the input gets the required property for accessiblity tools.',
    },
  },
};
