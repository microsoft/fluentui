import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

export const DateRange = (): JSXElement => {
  const [range, setRange] = React.useState<Date[]>([]);
  return (
    <Field label="Choose a week" hint={range.map(date => date.toLocaleDateString('en-US')).join(', ')}>
      <DatePicker
        today={new Date(2030, 0, 15)}
        calendar={{ dateRangeType: 'week', firstDayOfWeek: 'monday' }}
        onDateChange={(_, data) => setRange(data.selectedDateRange)}
      />
    </Field>
  );
};
