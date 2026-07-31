import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Input, Label } from '@fluentui/react-components';
import type { InputProps } from '@fluentui/react-components';

import styles from './InputControlled.module.css';

export const Controlled = (): JSXElement => {
  const inputId = useId('input');
  const [value, setValue] = React.useState('initial value');

  const onChange: InputProps['onChange'] = (ev, data) => {
    // The controlled input pattern can be used for other purposes besides validation,
    // but validation is a useful example
    if (data.value.length <= 20) {
      setValue(data.value);
    }
  };

  return (
    <div className={styles.root}>
      <Label htmlFor={inputId}>Controlled input limiting the value to 20 characters</Label>
      <Input value={value} onChange={onChange} id={inputId} />
    </div>
  );
};

Controlled.parameters = {
  docs: {
    description: {
      story:
        "An input can be controlled: the consuming component tracks the input's value in its state " +
        'and manually handles all updates.',
    },
  },
};
