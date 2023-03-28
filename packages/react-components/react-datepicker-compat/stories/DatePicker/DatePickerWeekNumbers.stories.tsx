import * as React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const WeekNumbers = () => {
  const styles = useStyles();

  return (
    <DatePicker
      showWeekNumbers={true}
      firstWeekOfYear={1}
      showMonthPickerAsOverlay={true}
      label="Start date"
      placeholder="Select a date..."
      className={styles.control}
    />
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
