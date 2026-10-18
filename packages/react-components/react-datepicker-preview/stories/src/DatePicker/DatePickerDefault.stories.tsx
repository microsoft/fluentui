import * as React from 'react';
import { DatePicker } from '@fluentui/react-datepicker-preview';
import { Field } from '@fluentui/react-components';
import type { DatePickerProps } from '@fluentui/react-datepicker-preview';

export const Default = (props: Partial<DatePickerProps>): React.ReactElement => (
  <Field label="Start date">
    <DatePicker placeholder="Select a date..." {...props} />
  </Field>
);
