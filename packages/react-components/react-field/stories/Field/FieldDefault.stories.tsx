import * as React from 'react';

import { Input } from '@fluentui/react-components';
import type { FieldProps } from '@fluentui/react-components/unstable';
import { Field } from '@fluentui/react-components/unstable';

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
