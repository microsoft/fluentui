import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

export const Disabled = (): JSXElement => (
  <Field label="Date cannot be changed">
    <DatePicker disabled defaultValue={new Date(2030, 0, 15)} />
  </Field>
);
