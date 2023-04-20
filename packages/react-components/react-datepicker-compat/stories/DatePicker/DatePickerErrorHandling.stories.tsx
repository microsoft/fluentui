import * as React from 'react';
import { addMonths, addYears, DatePicker, defaultDatePickerErrorStrings } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';
import type { DatePickerErrorData } from '../../src/DatePicker';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

const today = new Date(Date.now());
const minDate = addMonths(today, -1);
const maxDate = addYears(today, 1);

export const ErrorHandling = () => {
  const styles = useStyles();
  const [error, setError] = React.useState<DatePickerErrorData['error'] | undefined>(undefined);

  return (
    <Field
      required
      label={
        `Select a date out of bounds (minDate: ${minDate}, maxDate: ${maxDate}),` +
        ` type an invalid input, or leave the input empty and close the DatePicker.`
      }
      validationMessage={error && defaultDatePickerErrorStrings[error]}
    >
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        placeholder="Select a date..."
        allowTextInput
        onValidationError={data => setError(data.error)}
        className={styles.control}
      />
    </Field>
  );
};
