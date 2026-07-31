import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field } from '@fluentui/react-components';

import styles from './DatePickerDisabled.module.css';

export const Disabled = (): JSXElement => {
  return (
    <Field label="Disabled DatePicker">
      <DatePicker disabled placeholder="Select a date..." className={styles.control} />
    </Field>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'DatePicker can be disabled to restrict user interaction.',
    },
  },
};
