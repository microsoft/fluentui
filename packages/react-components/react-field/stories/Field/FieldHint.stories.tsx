import * as React from 'react';
import { Field } from '../../src/index';
import { Input } from '@fluentui/react-components';

export const Hint = () => (
  <Field label="Example with hint" hint="Hint text should be used sparingly.">
    <Input />
  </Field>
);

Hint.parameters = {
  docs: {
    description: {
      story: 'Hint text provides additional descriptive information about the field.',
    },
  },
};
