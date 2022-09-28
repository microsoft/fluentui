import * as React from 'react';
import type { SpinButtonFieldProps } from '@fluentui/react-field';
import { SpinButtonField } from '@fluentui/react-field';

export const Default = (props: Partial<SpinButtonFieldProps>) => (
  <SpinButtonField
    label="Example spin button field"
    validationState="success"
    validationMessage="This is a success message"
    hint="This is a hint message"
    {...props}
  />
);
