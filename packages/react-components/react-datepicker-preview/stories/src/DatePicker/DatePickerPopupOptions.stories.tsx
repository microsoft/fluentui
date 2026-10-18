import * as React from 'react';
import { Field } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-preview';

export const PopupOptions = (): JSXElement => (
  <Field label="Inline popup, aligned to end">
    <DatePicker inlinePopup today={new Date(2030, 0, 15)} positioning={{ position: 'below', align: 'end' }} />
  </Field>
);
