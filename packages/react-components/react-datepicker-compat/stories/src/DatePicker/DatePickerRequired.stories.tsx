import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field } from '@fluentui/react-components';

import styles from './DatePickerRequired.module.css';

export const Required = (): JSXElement => {
  return (
    <Field label="Date required" required>
      <DatePicker className={styles.control} placeholder="Select a date..." />
    </Field>
  );
};

Required.parameters = {
  docs: {
    description: {
      story: 'DatePicker supports required validation. The validation will happen when the DatePicker loses focus.',
    },
  },
};
