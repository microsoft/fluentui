import * as React from 'react';
import { InputField } from '@fluentui/react-field';

export const Hint = () => <InputField label="Example with hint" hint="Hint text should be used sparingly" />;

Hint.parameters = {
  docs: {
    description: {
      story: 'Hint text provides additional descriptive information about the field',
    },
  },
};
