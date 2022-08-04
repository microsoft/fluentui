import * as React from 'react';
import { Input } from '@fluentui/react-components';
import { Field } from '@fluentui/react-field';

export const Required = () => (
  <Field label="Required input" required>
    <Input />
  </Field>
);
