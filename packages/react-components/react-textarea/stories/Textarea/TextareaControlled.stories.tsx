import * as React from 'react';
import { Field, Textarea } from '@fluentui/react-components';
import type { TextareaProps } from '@fluentui/react-components';

export const Controlled = () => {
  const [value, setValue] = React.useState('initial value');

  const onChange: TextareaProps['onChange'] = (ev, data) => {
    if (data.value.length <= 50) {
      setValue(data.value);
    }
  };

  return (
    <Field label="Controlled Textarea limiting the value to 50 characters">
      <Textarea value={value} onChange={onChange} />
    </Field>
  );
};
