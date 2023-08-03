import * as React from 'react';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const TextInput = () => {
  const styles = useStyles();

  return (
    <Field label="Select a date">
      <DatePicker allowTextInput placeholder="Select a date..." className={styles.control} />
    </Field>
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
