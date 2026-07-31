import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field } from '@fluentui/react-components';
import type { DatePickerProps } from '@fluentui/react-datepicker-compat';

import styles from './DatePickerDefault.module.css';

export const Default = (props: Partial<DatePickerProps>): JSXElement => {
  return (
    <Field label="Select a date">
      <DatePicker className={styles.control} placeholder="Select a date..." {...props} />
    </Field>
  );
};
