import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const Disabled = () => {
  const styles = useStyles();

  return (
    <DatePicker
      disabled
      label="Disabled (with label)"
      placeholder="Select a date..."
      aria-label="Select a date"
      className={styles.control}
    />
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: 'DatePicker can be disabled to restrict user interaction.',
    },
  },
};
