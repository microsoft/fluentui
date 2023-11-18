import * as React from 'react';
import { addMonths, addYears } from '@fluentui/react-calendar-compat';
import { DatePicker, defaultDatePickerErrorStrings } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';
import type { DatePickerValidationResultData } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

const today = new Date();
const minDate = addMonths(today, -1);
const maxDate = addYears(today, 1);

const onFormatDate = (date?: Date): string => {
  return !date ? '' : `${date?.getMonth() + 1}/${date?.getDate()}/${date?.getFullYear()}`;
};

export const ErrorHandling = () => {
  const styles = useStyles();
  const [error, setError] = React.useState<DatePickerValidationResultData['error']>(undefined);

  return (
    <Field
      required
      label={
        `Select a date out of bounds (minDate: ${minDate.toDateString()}, maxDate: ${maxDate.toDateString()}),` +
        ` type an invalid input, or leave the input empty and close the DatePicker.`
      }
      validationMessage={error && defaultDatePickerErrorStrings[error]}
    >
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        formatDate={onFormatDate}
        placeholder="Select a date..."
        allowTextInput
        onValidationResult={data => setError(data.error)}
        className={styles.control}
      />
    </Field>
  );
};

ErrorHandling.parameters = {
  docs: {
    description: {
      story:
        'To add error handling to a DatePicker, use `onValidationResult` along with Field. `onValidationResult`' +
        'provides an error type string that can be used with defaultDatePickerErrorStrings to get default messages.',
    },
  },
};
