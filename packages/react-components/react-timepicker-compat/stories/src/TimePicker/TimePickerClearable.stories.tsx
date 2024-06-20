import * as React from 'react';
import { Field, makeStyles } from '@fluentui/react-components';
import { TimePicker } from '@fluentui/react-timepicker-compat';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
  },
});

export const Clearable = () => {
  const styles = useStyles();

  return (
    <Field label="Coffee time" className={styles.root}>
      <TimePicker clearable />
    </Field>
  );
};

Clearable.parameters = {
  docs: {
    description: {
      story: 'A TimePicker can be clearable and let users remove their selection.',
    },
  },
};
