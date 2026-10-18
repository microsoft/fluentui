import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

export const DefaultOpen = (): JSXElement => (
  <Field label="Initially open calendar">
    <DatePicker today={new Date(2030, 0, 15)} defaultOpen />
  </Field>
);
