import * as React from 'react';
import { Option } from '@fluentui/react-combobox';
import type { ComboboxFieldProps } from '@fluentui/react-field';
import { ComboboxField } from '@fluentui/react-field';

export const Default = (props: Partial<ComboboxFieldProps>) => (
  <ComboboxField
    label="Example combobox field"
    validationState="success"
    validationMessage="This is a success message"
    hint="This is a hint message"
    {...props}
  >
    <Option>Option one</Option>
    <Option>Option two</Option>
    <Option>Option three</Option>
  </ComboboxField>
);
