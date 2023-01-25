import * as React from 'react';
import type { CheckboxFieldProps } from '@fluentui/react-components/unstable';
import { CheckboxField } from '@fluentui/react-components/unstable';

export const Default = (props: Partial<CheckboxFieldProps>) => (
  <CheckboxField
    label="Example checkbox field"
    validationState="success"
    validationMessage="This is a success message"
    hint="This is a hint message"
    {...props}
  />
);
