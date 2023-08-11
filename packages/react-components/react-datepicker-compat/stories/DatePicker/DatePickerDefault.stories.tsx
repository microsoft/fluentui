import * as React from 'react';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';
import type { DatePickerProps } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const Default = (props: Partial<DatePickerProps>) => {
  const styles = useStyles();

  return (
    <Field label="Select a date">
      <DatePicker className={styles.control} placeholder="Select a date..." {...props} />
    </Field>
  );
};
