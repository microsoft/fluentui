import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, Label, Select } from '@fluentui/react-components';
import { DateRangeType } from '@fluentui/react-calendar-compat';
import { DatePicker } from '@fluentui/react-datepicker-compat';

import styles from './DatePickerDateRange.module.css';

const dateRangeOptions = {
  Day: DateRangeType.Day,
  'Work Week': DateRangeType.WorkWeek,
  Week: DateRangeType.Week,
  Month: DateRangeType.Month,
};

export const DateRange = (): JSXElement => {
  const [dateRangeType, setDateRangeType] = React.useState('Week');

  return (
    <div className={styles.container}>
      <Field label="Select a date">
        <DatePicker
          calendar={{ dateRangeType: dateRangeOptions[dateRangeType as keyof typeof dateRangeOptions] }}
          placeholder="Select a date..."
          className={styles.control}
        />
      </Field>
      <div>
        <Label htmlFor="select-daterange-id">Select a DateRangeType</Label>
        <Select
          onChange={(ev, data) => setDateRangeType(data.value)}
          value={dateRangeType}
          className={styles.control}
          id="select-daterange-id"
        >
          {Object.keys(dateRangeOptions).map(key => (
            <option key={key}>{key}</option>
          ))}
        </Select>
      </div>
    </div>
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
