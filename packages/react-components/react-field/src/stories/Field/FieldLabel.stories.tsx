import * as React from 'react';
import { InputField } from '@fluentui/react-field';

export const Label = () => <InputField label="Field label" />;

Label.parameters = {
  docs: {
    description: {
      story: 'The field label is placed above the field component by default.',
    },
  },
};
