import * as React from 'react';
import { Input } from '@fluentui/react-components';
import { Field } from '@fluentui/react-field';

export const HelperText = () => (
  <Field label="Channel name" helperText="Letters, numbers, and spaces are allowed">
    <Input defaultValue="Example name" />
  </Field>
);
