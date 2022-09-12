import * as React from 'react';
import type { TextareaFieldProps } from '@fluentui/react-field';
import { TextareaField } from '@fluentui/react-field';

export const Default = (props: Partial<TextareaFieldProps>) => (
  <TextareaField
    label="Example textarea field"
    validationState="success"
    validationMessage="This is a success message"
    hint="This is a hint message"
    {...props}
  />
);
