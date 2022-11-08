import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { defaultDatePickerStrings, DatePicker } from '@fluentui/react-datepicker';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
    '> *': {
      marginBottom: '15px',
    },
  },
});

export const Disabled = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <DatePicker
        disabled
        placeholder="Select a date..."
        ariaLabel="Select a date"
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={defaultDatePickerStrings}
      />

      <DatePicker
        disabled
        label="Disabled (with label)"
        placeholder="Select a date..."
        ariaLabel="Select a date"
        strings={defaultDatePickerStrings}
      />
    </div>
  );
};
