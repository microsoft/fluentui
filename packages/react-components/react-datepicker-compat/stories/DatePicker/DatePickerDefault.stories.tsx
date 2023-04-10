import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { Field } from '@fluentui/react-components/unstable';
import { DatePicker } from '@fluentui/react-datepicker-compat';
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
