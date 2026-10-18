import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

export const DateBoundaries = (): JSXElement => (
  <Field label="Available appointment" hint="January 10-25, excluding January 18.">
    <DatePicker
      allowTextInput
      today={new Date(2030, 0, 15)}
      minDate={new Date(2030, 0, 10)}
      maxDate={new Date(2030, 0, 25)}
      calendar={{ restrictedDates: [new Date(2030, 0, 18)] }}
    />
  </Field>
);
