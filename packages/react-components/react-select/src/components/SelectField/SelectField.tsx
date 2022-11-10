import * as React from 'react';
import type { FieldProps } from '@fluentui/react-field';
import {
  getFieldClassNames,
  renderField_unstable,
  useFieldStyles_unstable,
  useField_unstable,
} from '@fluentui/react-field';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { Select } from '../../Select';

export type SelectFieldProps = FieldProps<typeof Select>;

export const selectFieldClassNames = getFieldClassNames('SelectField');

export const SelectField: ForwardRefComponent<SelectFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: Select, classNames: selectFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

SelectField.displayName = 'SelectField';
