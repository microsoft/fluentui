import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components';
import { TimePicker } from '@fluentui/react-timepicker-compat';

import styles from './TimePickerClearable.module.css';

export const Clearable = (): JSXElement => {
  return (
    <Field label="Coffee time" className={styles.root}>
      <TimePicker clearable />
    </Field>
  );
};

Clearable.parameters = {
  docs: {
    description: {
      story: 'A TimePicker can be clearable and let users remove their selection.',
    },
  },
};
