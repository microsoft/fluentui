import * as React from 'react';
import type { InputFieldProps } from '@fluentui/react-field';
import { InputField } from '@fluentui/react-field';

export const Default = (props: Partial<InputFieldProps>) => (
  <InputField
    label="Example input field"
    validationState="success"
    validationMessage="This is a success message"
    hint="This is a hint message"
    {...props}
  />
);
