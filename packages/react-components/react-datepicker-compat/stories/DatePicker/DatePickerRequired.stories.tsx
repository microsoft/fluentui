import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field } from '@fluentui/react-field';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const Required = () => {
  const styles = useStyles();

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
