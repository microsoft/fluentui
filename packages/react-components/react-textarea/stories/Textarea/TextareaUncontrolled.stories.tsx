import * as React from 'react';
import { Field, Textarea } from '@fluentui/react-components';
import type { TextareaProps } from '@fluentui/react-components';

const onChange: TextareaProps['onChange'] = (ev, data) => {
  // Uncontrolled inputs can be notified of changes to the value
  console.log(`New value: "${data.value}"`);
};

export const Uncontrolled = () => (
  <Field label="Uncontrolled Textarea" hint="Check console for new value">
    <Textarea onChange={onChange} placeholder="type here..." />
  </Field>
);
