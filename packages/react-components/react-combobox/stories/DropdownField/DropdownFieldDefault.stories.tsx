import * as React from 'react';
import { Option } from '@fluentui/react-combobox';
import type { DropdownFieldProps } from '@fluentui/react-components/unstable';
import { DropdownField } from '@fluentui/react-components/unstable';

export const Default = (props: Partial<DropdownFieldProps>) => (
  <DropdownField
    label="Example dropdown field"
    validationState="success"
    validationMessage="This is a success message"
    hint="This is a hint message"
    {...props}
  >
    <Option>Option one</Option>
    <Option>Option two</Option>
    <Option>Option three</Option>
  </DropdownField>
);
