import * as React from 'react';
import { Input } from '@fluentui/react-components';
import { Field, FieldProps } from '@fluentui/react-field';

export const Default = (props: Partial<FieldProps>) => (
  <Field
    label="Example Field"
    status="success"
    statusText="This is a success message"
    helperText="Helper text should be used sparingly"
    {...props}
  >
    <Input />
  </Field>
);
