import * as React from 'react';
import { Input } from '@fluentui/react-components';
import { Field } from '@fluentui/react-field';

export const Label = () => (
  <Field label="Name">
    <Input />
  </Field>
);

Label.parameters = {
  docs: {
    description: {
      story: 'The Field label is placed above the field component by default.',
    },
  },
};
