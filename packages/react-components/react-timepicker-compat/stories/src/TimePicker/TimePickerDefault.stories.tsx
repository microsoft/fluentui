import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components';
import type { TimePickerProps } from '@fluentui/react-timepicker-compat';
import { TimePicker } from '@fluentui/react-timepicker-compat';

import styles from './TimePickerDefault.module.css';

export const Default = (props: Partial<TimePickerProps>): JSXElement => {
  return (
    <Field label="Coffee time" className={styles.root}>
      <TimePicker {...props} />
    </Field>
  );
};
