import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';
import { formatDate, parseDate } from './dateFormatting';

export const CustomDateFormatting = (): JSXElement => (
  <Field label="Date (day/month/year)">
    <DatePicker
      allowTextInput
      today={new Date(2030, 0, 15)}
      defaultValue={new Date(2030, 0, 15)}
      formatDate={formatDate}
      parseDate={parseDate}
    />
  </Field>
);
