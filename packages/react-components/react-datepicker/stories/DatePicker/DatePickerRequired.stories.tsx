import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { defaultDatePickerStrings, DatePicker } from '@fluentui/react-datepicker';

const useStyles = makeStyles({
  root: {
    '> *': {
      marginBottom: '15px',
    },
  },
  control: {
    maxWidth: '300px',
  },
});

export const Required = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>Validation will happen when the DatePicker loses focus.</div>
      <DatePicker
        isRequired
        className={styles.control}
        label="Date required (with label)"
        placeholder="Select a date..."
        ariaLabel="Select a date"
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
      />
      <DatePicker
        isRequired
        className={styles.control}
        placeholder="Date required with no label..."
        ariaLabel="Select a date"
        strings={defaultDatePickerStrings}
      />
    </div>
  );
};
