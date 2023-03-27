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

export const TextInput = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <DatePicker className={styles.control} label="Start date" allowTextInput aria-label="Select a date" />
    </div>
  );
};

TextInput.parameters = {
  docs: {
    description: {
      story:
        'A DatePicker supports user input. Clicking the input field will open the DatePicker, and clicking the' +
        ' field again will dismiss the DatePicker and allow text input. When using keyboard navigation (tabbing into' +
        ' the field), text input is allowed by default, and pressing Enter will open the DatePicker.',
    },
  },
};
