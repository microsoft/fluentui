import * as React from 'react';
import { InputField } from '@fluentui/react-field';

export const HelperText = () => (
  <InputField label="Example with helper text" helperText="Helper text should be used sparingly" />
);

HelperText.parameters = {
  docs: {
    description: {
      story: 'Helper text provides additional descriptive information about the field',
    },
  },
};
