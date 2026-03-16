import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';

import type { FieldProps } from '@fluentui/react-components';
import { Field, Input } from '@fluentui/react-components';

export const Default = (props: Partial<FieldProps>): JSXElement => (
  <Field label="Example field" validationState="success" validationMessage="This is a success message." {...props}>
    <Input />
  </Field>
);
