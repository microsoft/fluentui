import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles } from '@fluentui/react-components';
import { TimePicker, TimePickerProps } from '@fluentui/react-timepicker-compat';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
  },
});

export const Default = (props: Partial<TimePickerProps>): JSXElement => {
  const styles = useStyles();
  return (
    <Field label="Coffee time" className={styles.root}>
      <TimePicker {...props} />
    </Field>
  );
};
