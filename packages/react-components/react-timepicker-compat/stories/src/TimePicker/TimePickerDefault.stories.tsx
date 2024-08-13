import * as React from 'react';
import { Field, makeStyles } from '@fluentui/react-components';
import { TimePicker, TimePickerProps } from '@fluentui/react-timepicker-compat';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
  },
});

export const Default = (props: Partial<TimePickerProps>) => {
  const styles = useStyles();
  return (
    <Field label="Coffee time" className={styles.root}>
      <TimePicker {...props} />
    </Field>
  );
};
