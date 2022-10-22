import * as React from 'react';
import type { SwitchFieldProps } from '@fluentui/react-field';
import { SwitchField } from '@fluentui/react-field';

export const Default = (props: Partial<SwitchFieldProps>) => (
  <SwitchField
    label="Example switch field"
    validationState="success"
    validationMessage="This is a success message"
    hint="This is a hint message"
    {...props}
  />
);
