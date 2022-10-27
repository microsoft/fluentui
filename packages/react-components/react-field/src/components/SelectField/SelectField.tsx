import * as React from 'react';
import { Select } from '@fluentui/react-select';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { FieldProps } from '../../Field';
import { getFieldClassNames, renderField_unstable, useFieldStyles_unstable, useField_unstable } from '../../Field';

export type SelectFieldProps = FieldProps<typeof Select>;

export const selectFieldClassNames = getFieldClassNames('SelectField');

export const SelectField: ForwardRefComponent<SelectFieldProps> = React.forwardRef((props, ref) => {
  const state = useField_unstable(props, ref, { component: Select, classNames: selectFieldClassNames });
  useFieldStyles_unstable(state);
  return renderField_unstable(state);
});

SelectField.displayName = 'SelectField';
