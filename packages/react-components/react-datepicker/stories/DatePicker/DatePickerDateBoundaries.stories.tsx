import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { addMonths, addYears, defaultDatePickerStrings, DatePicker } from '@fluentui/react-datepicker';
import type { DatePickerStrings } from '@fluentui/react-datepicker';

const useStyles = makeStyles({
  root: {
    marginTop: '15px',
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
    <div>
      <div>
        When date boundaries are set (via <code>minDate</code> and <code>maxDate</code> props) the DatePicker will not
        allow out-of-bounds dates to be picked or entered. In this example, the allowed dates are{' '}
        {minDate.toLocaleDateString()} to {maxDate.toLocaleDateString()}.
      </div>
      <DatePicker
        className={styles.root}
        // DatePicker uses English strings by default. For localized apps, you must override this prop.
        strings={strings}
        placeholder="Select a date..."
        ariaLabel="Select a date"
        minDate={minDate}
        maxDate={maxDate}
        allowTextInput
      />
    </div>
  );
};
