import * as React from 'react';
import { addMonths, addYears } from '@fluentui/react-calendar-compat';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  inputControl: {
    maxWidth: '300px',
  },
});

const today = new Date();
const minDate = addMonths(today, -1);
const maxDate = addYears(today, 1);

const onFormatDate = (date?: Date): string => {
  return !date ? '' : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const DateBoundaries = () => {
  const styles = useStyles();

  return (
    <Field label={`The date boundaries for this example are ${minDate.toDateString()} to ${maxDate.toDateString()}.`}>
      <DatePicker
        minDate={minDate}
        maxDate={maxDate}
        placeholder="Select a date..."
        formatDate={onFormatDate}
        allowTextInput
        className={styles.inputControl}
      />
    </Field>
  );
};

DateBoundaries.parameters = {
  docs: {
    description: {
      story:
        'A DatePicker allows setting date boundaries. To set a max boundary, use the `maxDate` prop. To set a minimum' +
        ' boundary, use the `minDate` prop. When date boundaries are set the DatePicker will not allow out-of-bounds' +
        ' dates to be picked or entered.',
    },
  },
};
