import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

export const DefaultOpenInline = (): JSXElement => (
  <Field label="Initially open inline calendar">
    <DatePicker today={new Date(2030, 0, 15)} defaultOpen inlinePopup />
  </Field>
);
