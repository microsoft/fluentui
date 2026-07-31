import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { useId, Input, Label } from '@fluentui/react-components';
import type { InputProps } from '@fluentui/react-components';

import styles from './InputUncontrolled.module.css';

const onChange: InputProps['onChange'] = (ev, data) => {
  // Uncontrolled inputs can be notified of changes to the value
  console.log(`New value: "${data.value}"`);
};

export const Uncontrolled = (): JSXElement => {
  const inputId = useId('input');

  return (
    <div className={styles.root}>
      <Label htmlFor={inputId}>Uncontrolled input with default value</Label>
      <Input defaultValue="default value" onChange={onChange} id={inputId} />
    </div>
  );
};

Uncontrolled.parameters = {
  docs: {
    description: {
      story:
        'By default, an input is uncontrolled: it tracks all updates internally. ' +
        'You can optionally provide a default value.',
    },
  },
};
