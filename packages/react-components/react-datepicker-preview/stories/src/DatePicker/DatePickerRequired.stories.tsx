import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

export const Required = (): JSXElement => (
  <Field label="Required date" required>
    <DatePicker today={new Date(2030, 0, 15)} />
  </Field>
);
