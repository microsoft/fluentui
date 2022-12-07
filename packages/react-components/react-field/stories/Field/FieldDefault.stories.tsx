import * as React from 'react';
import { Field } from '../../src/index';
import type { FieldProps } from '../../src/index';
import { Input } from '@fluentui/react-components';

export const Default = (props: Partial<FieldProps>) => (
  <Field
    label="Example field"
    validationState="success"
    validationMessage="This is a success message."
    hint="Fields can have hint text, but it should be used sparingly."
    {...props}
  >
    <Input />
  </Field>
);
