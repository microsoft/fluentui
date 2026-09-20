import * as React from 'react';
import { Field } from '@fluentui/react-components';
import { Textarea } from '@fluentui/react-modern-components-preview/textarea';
import type { TextareaProps } from '@fluentui/react-modern-components-preview/textarea';

export const Default = (props: Partial<TextareaProps>): React.ReactNode => (
  <Field label="Default Textarea">
    <Textarea {...props} />
  </Field>
);
