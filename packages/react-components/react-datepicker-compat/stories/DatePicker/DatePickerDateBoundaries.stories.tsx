import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { addMonths, addYears, defaultDatePickerStrings, DatePicker } from '@fluentui/react-datepicker-compat';
import type { DatePickerStrings } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  inputControl: {
    maxWidth: '300px',
  },
});

const today = new Date(Date.now());
const minDate = addMonths(today, -1);
const maxDate = addYears(today, 1);
const strings: DatePickerStrings = {
  ...defaultDatePickerStrings,
  isOutOfBoundsErrorMessage: `Date must be between ${minDate.toLocaleDateString()} and ${maxDate.toLocaleDateString()}`,
};

export const DateBoundaries = () => {
  const styles = useStyles();

  return (
    <DatePicker
      minDate={minDate}
      maxDate={maxDate}
      label={`The date boundaries for this example are ${minDate.toLocaleDateString()} to ${maxDate.toLocaleDateString()}.`}
      aria-label="Select a date"
      placeholder="Select a date..."
      allowTextInput
      // DatePicker uses English strings by default. For localized apps, you must override this prop.
      strings={strings}
      input={{ className: styles.inputControl }}
    />
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
