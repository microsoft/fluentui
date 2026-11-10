import * as React from 'react';
import { Field, Textarea } from '@fluentui/react-components';
import type { JSXElement, TextareaProps } from '@fluentui/react-components';

export const Default = (props: Partial<TextareaProps>): JSXElement => (
  <Field label="Default Textarea">
    <Textarea {...props} />
  </Field>
);
