import * as React from 'react';
import { Field, makeStyles } from '@fluentui/react-components';
import { DatePicker, DateRangeType } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  control: {
    maxWidth: '300px',
  },
});

export const DateRange = () => {
  const styles = useStyles();

  return (
    <Field label="Select a date">
      <DatePicker
        calendar={{ dateRangeType: DateRangeType.Week }}
        placeholder="Select a date..."
        className={styles.control}
      />
    </Field>
  );
};

DateRange.parameters = {
  docs: {
    description: {
      story:
        'DatePicker allows you to set the selection range type. The range can be `Day`, `Month`, `Week`, and' +
        ' `WorkWeek`. The default is `Day`.',
    },
  },
};
