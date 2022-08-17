import * as React from 'react';
import { InputField, InputFieldProps } from '@fluentui/react-field';

export const Default = (props: Partial<InputFieldProps>) => (
  <InputField
    label="Example field"
    status="success"
    statusText="This is a success message"
    helperText="Fields can have helper text, but it should be used sparingly"
    {...props}
  />
);
