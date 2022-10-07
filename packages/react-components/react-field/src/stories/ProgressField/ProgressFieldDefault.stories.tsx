import * as React from 'react';
import type { ProgressFieldProps } from '@fluentui/react-field';
import { ProgressField } from '@fluentui/react-field';

export const Default = (props: Partial<ProgressFieldProps>) => (
  <ProgressField
    label="Example Progress field"
    value={0.75}
    validationState="success"
    validationMessage="This is a success message"
    hint="This is a hint message"
    {...props}
  />
);
