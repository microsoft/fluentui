import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
  control: {
    maxWidth: '300px',
  },
});

export const Required = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <DatePicker
        isRequired
        className={styles.control}
        label="Date required"
        placeholder="Select a date..."
        aria-label="Select a date"
      />
    </div>
  );
};

Required.parameters = {
  docs: {
    description: {
      story: 'DatePicker supports required validation. The validation will happen when the DatePicker loses focus.',
    },
  },
};
