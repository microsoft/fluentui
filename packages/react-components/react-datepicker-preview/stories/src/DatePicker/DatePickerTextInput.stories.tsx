import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

export const TextInput = (): JSXElement => (
  <Field label="Start date" hint="Type a date or select one from the calendar.">
    <DatePicker allowTextInput today={new Date(2030, 0, 15)} placeholder="January 15, 2030" />
  </Field>
);
