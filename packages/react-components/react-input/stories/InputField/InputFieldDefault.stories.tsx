import * as React from 'react';
import type { InputFieldProps } from '@fluentui/react-components/unstable';
import { InputField } from '@fluentui/react-components/unstable';

export const Default = (props: Partial<InputFieldProps>) => (
  <InputField
    label="Example input field"
    validationState="success"
    validationMessage="This is a success message"
    hint="This is a hint message"
    {...props}
  />
);
