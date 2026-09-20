import * as React from 'react';

import { Field } from '@fluentui/react-components';
import { Textarea } from '@fluentui/react-modern-components-preview/textarea';
import type { TextareaProps } from '@fluentui/react-modern-components-preview/textarea';

export const Controlled = (): React.ReactNode => {
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
