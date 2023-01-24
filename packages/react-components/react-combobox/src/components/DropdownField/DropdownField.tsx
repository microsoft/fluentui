import * as React from 'react';
import type { FieldProps } from '@fluentui/react-field';
import {
  getFieldClassNames,
  renderField_unstable,
  useFieldStyles_unstable,
  useField_unstable,
} from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Dropdown } from '../../Dropdown';

export type DropdownFieldProps = FieldProps<typeof Dropdown>;

export const dropdownFieldClassNames = getFieldClassNames('DropdownField');

export const DropdownField: ForwardRefComponent<DropdownFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: Dropdown, classNames: dropdownFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

DropdownField.displayName = 'DropdownField';
