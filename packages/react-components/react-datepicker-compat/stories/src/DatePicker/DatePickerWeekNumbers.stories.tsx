import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field } from '@fluentui/react-components';

import styles from './DatePickerWeekNumbers.module.css';

export const WeekNumbers = (): JSXElement => {
  return (
    <Field label="Start date">
      <DatePicker
        showWeekNumbers={true}
        firstWeekOfYear={1}
        showMonthPickerAsOverlay={true}
        placeholder="Select a date..."
        className={styles.control}
      />
    </Field>
  );
};

WeekNumbers.parameters = {
  docs: {
    description: {
      story:
        'A DatePicker allows you to show the number of the week on the left when `showWeekNumbers` is set to true.',
    },
  },
};
