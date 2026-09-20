import * as React from 'react';

import type { FieldProps } from '@fluentui/react-modern-components-preview/field';
import { Field } from '@fluentui/react-modern-components-preview/field';
import { Input } from '@fluentui/react-components';

export const Default = (props: Partial<FieldProps>): React.ReactNode => (
  <Field label="Example field" validationState="success" validationMessage="This is a success message." {...props}>
    <Input />
  </Field>
);
