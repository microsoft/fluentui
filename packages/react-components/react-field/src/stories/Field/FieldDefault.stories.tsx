import * as React from 'react';
import { InputField, InputFieldProps } from '@fluentui/react-field';

export const Default = (props: Partial<InputFieldProps>) => (
  <InputField
    label="Example field"
    validationState="success"
    validationMessage="This is a success message"
    hint="Fields can have hint text, but it should be used sparingly"
    {...props}
  />
);
