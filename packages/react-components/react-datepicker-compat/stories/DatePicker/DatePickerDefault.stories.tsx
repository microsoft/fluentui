import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import type { DatePickerProps } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const Default = (props: Partial<DatePickerProps>) => {
  const styles = useStyles();

  return <DatePicker label="Start date" className={styles.control} {...props} />;
};
