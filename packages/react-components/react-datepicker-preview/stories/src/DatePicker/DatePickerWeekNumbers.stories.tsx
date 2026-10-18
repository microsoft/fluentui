import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

export const WeekNumbers = (): JSXElement => (
  <Field label="Date with ISO week numbering">
    <DatePicker
      today={new Date(2030, 0, 15)}
      calendar={{ showWeekNumbers: true, firstDayOfWeek: 'monday', firstWeekOfYear: 'firstFourDayWeek' }}
    />
  </Field>
);
