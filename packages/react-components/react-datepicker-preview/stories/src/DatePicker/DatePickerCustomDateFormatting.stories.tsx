import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

export const CustomDateFormatting = (): JSXElement => (
  <Field label="Date (day/month/year)">
    <DatePicker
      allowTextInput
      today={new Date(2030, 0, 15)}
      defaultValue={new Date(2030, 0, 15)}
      formatDate={date => new Intl.DateTimeFormat('en-GB').format(date)}
      parseDate={text => {
        const [day, month, year] = text.split('/').map(Number);
        if (!day || !month || !year) {
          return null;
        }
        const date = new Date(year, month - 1, day);
        return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : null;
      }}
    />
  </Field>
);
