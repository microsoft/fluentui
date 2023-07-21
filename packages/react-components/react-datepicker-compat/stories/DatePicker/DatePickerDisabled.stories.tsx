import * as React from 'react';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const Disabled = () => {
  const styles = useStyles();

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
