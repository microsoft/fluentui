import * as React from 'react';
import { Field } from '@fluentui/react-components';
import { Textarea } from '@fluentui/react-modern-components-preview/textarea';
import type { TextareaProps } from '@fluentui/react-modern-components-preview/textarea';

const onChange: TextareaProps['onChange'] = (ev, data) => {
  // Uncontrolled inputs can be notified of changes to the value
  console.log(`New value: "${data.value}"`);
};

export const Uncontrolled = (): React.ReactNode => (
  <Field label="Uncontrolled Textarea" hint="Check console for new value">
    <Textarea onChange={onChange} placeholder="type here..." />
  </Field>
);
