import * as React from 'react';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { Field, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const WeekNumbers = () => {
  const styles = useStyles();

  return (
    <Field label="Start date">
      <DatePicker
        showWeekNumbers={true}
        firstWeekOfYear={1}
        showMonthPickerAsOverlay={true}
        placeholder="Select a date..."
        className={styles.control}
      />
    </Field>
  );
};

WeekNumbers.parameters = {
  docs: {
    description: {
      story:
        'A DatePicker allows you to show the number of the week on the left when `showWeekNumbers` is set to true.',
    },
  },
};
