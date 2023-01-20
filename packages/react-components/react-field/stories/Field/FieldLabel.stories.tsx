import * as React from 'react';
import { Field } from '../../src/index';
import { Input } from '@fluentui/react-components';

export const Label = () => (
  <Field label="Field label">
    <Input />
  </Field>
);

Label.parameters = {
  docs: {
    description: {
      story: 'The field label is placed above the field component by default.',
    },
  },
};
